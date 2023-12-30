import { Contribution, User, Perk, Campaign } from "../model/index.js";
import mongoose from "mongoose"
import { Buffer } from "buffer";
import crypto from 'crypto'
import https from 'https'
import nodemailer from 'nodemailer';
import moment from "moment";

const getAllContributionsOfUser = async (req, res) => {
    try {
        const {id} = req.params
        let { page = 1, size = 15, status = 'Tất cả', searchString = '' } = req.query;
            page = parseInt(page);
            size = parseInt(size);
            size = size >= 15 ? 15 : size;
            const filterContributes = await Contribution.aggregate([
                {
                    $lookup: {
                        from: 'campaigns',
                        localField: 'campaign',
                        foreignField: '_id',
                        as: 'campaignInfo',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userInfo',
                    },
                },
                {
                    $unwind: '$campaignInfo',
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $match: {
                        $and: [
                            {
                                user: new mongoose.Types.ObjectId(id)
                            },
                            {
                                isFinish:
                                    status === 'Tất cả' ? { $ne: 'Tất cả' } : status === 'Chưa nhận' ? false : true,
                            },
                            {
                                $or: [
                                    {
                                        'campaignInfo.title': { $regex: `.*${searchString}.*`, $options: 'i' },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    $skip: (page - 1) * size,
                },
                {
                    $limit: size,
                },
            ]);

            const totalRecords = await Contribution.aggregate([
                {
                    $lookup: {
                        from: 'campaigns',
                        localField: 'campaign',
                        foreignField: '_id',
                        as: 'campaignInfo',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userInfo',
                    },
                },
                {
                    $unwind: '$campaignInfo',
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $match: {
                        $and: [
                            {
                                isFinish:
                                    status === 'Tất cả' ? { $ne: 'Tất cả' } : status === 'Chưa nhận' ? false : true,
                            },
                            {
                                $or: [
                                    {
                                        'campaignInfo.title': { $regex: `.*${searchString}.*`, $options: 'i' },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                    },
                }
            ])
            const totalPages = Math.ceil(totalRecords[0] ? (totalRecords[0].count / size) : 0);


            res.status(200).json({
                message: 'Lấy thông tin các đóng góp của người dùng thành công',
                data: {
                    contributions: filterContributes,
                    totalPages,
                },
            });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};


const getQuantityPeople = async (req, res) => {
    try {
        const { id } = req.params;
        const contributes = await Contribution.find({ campaign: id }).exec();
        res.status(200).json({
            message: 'Lấy số người ủng hộ dự án thành công',
            data: contributes.length,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}
const getMoneyByCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const contributes = await Contribution.find({ campaign: id }).exec();
        let amount = 0;
        for (let i = 0; i < contributes.length; i++) {
            amount = amount + contributes[i].money;
        }
        res.status(200).json({
            message: 'Lấy số tiền ủng hộ dự án thành công',
            data: amount,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

const handlePayment = async (req, res) => {
    try {
        const contribution = req.body;
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var requestId = partnerCode + new Date().getTime();
        if (contribution.user) {
            const user = await User.findById(contribution.user).exec()
            contribution.email = user.email
        }
        else {
            contribution.email = ''
        }
        contribution.date = new Date()
        contribution.orderId = requestId
        contribution.key = 'payment'
        let objJsonStr = JSON.stringify(contribution);
        let objJsonB64 = Buffer.from(objJsonStr).toString("base64");

        var orderInfo = 'PAYWITHMOMO'
        var orderId = requestId;
        // var redirectUrl = "https://momo.vn/return";
        var redirectUrl = `http://localhost:3000/payment/thank`
        var ipnUrl = "https://callback.url/notify";
        // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
        var amount = contribution.money
        var requestType = "payWithATM"
        // var requestType = "captureWallet"
        var extraData = objJsonB64; //pass empty value if your merchant does not have stores
        const expireTime = moment().add(10, 'minutes').unix(); // Thời gian hết hạn 5 phút sau thời điểm hiện tại
        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
        //puts raw signature
        // console.log("--------------------RAW SIGNATURE----------------")
        // console.log(rawSignature)
        //signature
        var signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');
        // console.log("--------------------SIGNATURE----------------")
        // console.log(signature)

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'en'
        });
        //Create the HTTPS objects
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        }
        //Send the request and get the response
        const req2 = https.request(options, res2 => {
            // console.log(`Status: ${res2.statusCode}`);
            // console.log(`Headers: ${JSON.stringify(res2.headers)}`);
            res2.setEncoding('utf8');
            let url = ''
            res2.on('data', (body) => {
                url = JSON.parse(body).payUrl;
            });
            res2.on('end', async () => {
                res.status(200).json({
                    data: url
                })
            });
        })

        req2.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        console.log("Sending....")
        req2.write(requestBody);
        req2.end();
    } catch (error) {

    }
}

const handleSuccess = async (req, res) => {
    try {
        const { extraData, orderId } = req.body
        const json = Buffer.from(extraData, "base64").toString()
        const decode = JSON.parse(json);
        if (orderId === decode.orderId) {
            if (decode.key === 'payment') {
                delete decode.orderId
                delete decode.key
                const options = {
                    new: true, // Trả về bản ghi sau khi cập nhật
                    upsert: true, // Tạo mới nếu không tìm thấy bản ghi
                    setDefaultsOnInsert: true // Nếu tạo mới, sử dụng giá trị mặc định từ schema
                };
                const old = await Contribution.findOne({ contributionId: orderId }).exec()
                if (!old) {
                    const contribution = await Contribution.findOneAndUpdate({ contributionId: orderId }, { ...decode, contributionId: orderId }, options).exec()
                    for (let i = 0; i<contribution.perks.length; i++) {
                        const perk = await Perk.findById(contribution.perks[i].perkId).exec();
                        perk.claimed = perk.claimed + contribution.perks[i].quantity
                        await perk.save()
                    }
                    const user = await User.findById(contribution.user).exec()
                    const campaign = await Campaign.findById(contribution.campaign).exec()
                    await sendMail({
                        email: user.email,
                        title: '[GIVEFUN] - KẾT QUẢ ĐÓNG GÓP CHIẾN DỊCH',
                        templateHTML: templateGiveGift({
                            ...decode,
                            campaignTitle: campaign.title,
                        })
                    })

                    res.status(200).json({
                        message: 'Đóng góp thành công',
                        data: contribution.campaign
                    })
                }
                else throw new Error('Giao dịch đã tồn tại')

            }
            else throw new Error('Khôn tồn tại giao dịch')

        }
        else throw new Error('Khôn tồn tại giao dịch')


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


const getAllContributionsByCampaign = async (req, res) => {
    try {
        const { id } = req.params
        let { page = 1, size = 15, status = 'Tất cả', searchString = '', time = 'Tất cả', money = 'Tất cả', timeDelivery = 'Tất cả' } = req.query;
        page = parseInt(page);
        size = parseInt(size)
        size = size >= 15 ? 15 : size
        const aggregationStages = [
            {
                $match: {
                    $and: [
                        {
                            isFinish: status === 'Tất cả' ? { $ne: 'Tất cả' } : (status === 'Chưa gửi' ? false : true)
                        },
                        {
                            $or: [
                                {
                                    'shippingInfo.fullName': { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                                {
                                    email: { $regex: `.*${searchString}.*`, $options: 'i' }
                                }
                            ]
                        },
                        {
                            campaign: new mongoose.Types.ObjectId(id)
                        }
                    ]

                }
            },
            {
                $addFields: {
                    hasUser: { $ne: ["$user", null] }
                }
            }
        ];

        // Thêm giai đoạn $lookup chỉ khi có user
        aggregationStages.push(
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $project: {
                    'user.password': 0,
                    'user.refreshToken': 0,
                    'user.isAdmin': 0,
                    'user.isVerifiedEmail': 0,
                    'user.isVerifiedUser': 0,
                }
            },

        );

        // Giữ nguyên bản ghi khi không có user
        aggregationStages.push(
            {
                $addFields: {
                    user: {
                        $cond: {
                            if: "$hasUser",
                            then: "$user",
                            else: null
                        }
                    }
                }
            },
            {
                $unset: "hasUser"
            }
        );
        if (time === 'Tất cả') {
            aggregationStages.push(
                {
                    $sort: {
                        date: -1
                    }
                }
            );
        }

        // Thực hiện sắp xếp theo trường date giảm dần
        if (time !== 'Tất cả') {
            aggregationStages.push(
                {
                    $sort: {
                        date: time === 'Gần nhất' ? -1 : 1
                    }
                }
            );
        }
        if (timeDelivery !== 'Tất cả') {
            aggregationStages.push(
                {
                    $sort: {
                        'shippingInfo.estDelivery': timeDelivery === 'Sớm nhất' ? 1 : -1
                    }
                }
            );
        }
        
        if (money !== 'Tất cả') {
            aggregationStages.push(
                {
                    $sort: {
                        money: money === 'Tăng dần' ? 1 : -1
                    }
                }
            );
        }


        const filterContributions = await Contribution.aggregate(aggregationStages);


        const totalRecords = await Contribution.aggregate([
            {
                $match: {
                    $and: [
                        {
                            isFinish: status === 'Tất cả' ? { $ne: 'Tất cả' } : (status === 'Chưa gửi' ? false : true)
                        },
                        {
                            $or: [
                                {
                                    'shippingInfo.fullName': { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                                {
                                    email: { $regex: `.*${searchString}.*`, $options: 'i' }
                                }
                            ]
                        },
                        {
                            campaign: new mongoose.Types.ObjectId(id)
                        }
                    ]

                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                },
            },
        ])
        const totalPages = Math.ceil(totalRecords[0] ? (totalRecords[0].count / size) : 0);
        res.status(200).json({
            message: 'Lấy thông tin các chiến dịch  thành công',
            data: {
                contributions: filterContributions,
                totalPages
            }
        })

    } catch (error) {
        debugger
        res.status(400).json({
            message: error.message
        })
    }
}

const editStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isFinish } = req.body;
        await Contribution.findByIdAndUpdate(id, { isFinish }).exec()
        res.status(200).json({
            message: 'Cập nhật trạng thái gửi đặc quyền thành công'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getTopUserContributionByCampaign = async (req, res) => {
    try {
        const { id } = req.params
        const listUserContribution = await Contribution.aggregate([
            {
                $match: {
                    campaign: new mongoose.Types.ObjectId(id),
                    user: { $ne: null }
                }
            },
            {
                $group: {
                    _id: "$user",
                    totalMoney: { $sum: "$money" },
                    totalCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users", // Tên của collection User
                    localField: "_id",
                    foreignField: "_id",
                    as: "userData"
                }
            },
            {
                $unwind: "$userData" // Unwind để có thể truy cập các trường của user
            },
            {
                $project: {
                    'userData.password': 0,
                    'userData.refreshToken': 0,
                    'userData.isAdmin': 0,
                    'userData.isVerifiedEmail': 0,
                    'userData.isVerifiedUser': 0,
                }
            },
            {
                $project: {
                    _id: 1,
                    totalMoney: 1,
                    totalCount: 1,
                    user: "$userData" // Gán thông tin user vào trường user
                }
            },
            {
                $sort: { totalMoney: -1 } // Sắp xếp theo tổng tiền giảm dần
            },
            {
                $limit: 5 // Giới hạn kết quả thành top 5
            }
        ])

        res.status(200).json({
            message: 'Lấy danh sách top 5 thành công',
            data: listUserContribution
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


const getQuantityContributeOfUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const contributes = await Contribution.find({ user: id }).exec();

        res.status(200).json({
            message: 'Lấy số lượt đóng góp của user thành công',
            data: contributes.length,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
const sendMail = async ({ email, title, content, templateHTML }) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '21520417@gm.uit.edu.vn',
                pass: '08682087444mailuit',
            },
        });

        var mailOptions = {
            from: '21520417@gm.uit.edu.vn',
            to: email,
            subject: title,
            html: templateHTML
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};
const convertDate = (d) => {
    const date = new Date(d);

    // Lấy thông tin ngày, tháng, năm
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Tạo chuỗi ngày tháng định dạng 'DD-MM-YYYY'
    const formattedDate = `${month}/${year}`;
    return formattedDate;
}
const templateGiveGift = (gift) => {

    // const listPerkHTML = gift.perks.map(item => {
    //     return `<div style="margin-left: 20px; margin-top: 10px;">
    //     <b style="font-style: italic;">${item.perkTitle}</b>
    //     <ul style="margin-left: 40px;">
    //         ${item.options.map(i => {
    //             return `<li>${i.name} ${i.optionsString}</li>`
    //         }).join('')}
    //     </ul>
    //   </div>`
    // }).join('')
    const date = convertDate(gift.shippingInfo.estDelivery)
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Template Email</title>
      <style>
        *{ 
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          box-sizing: border-box;
         }
         .container {
          display: flex;
          flex-direction: column;
          align-items: center;
         }
        .header {
          display: flex;
          flex-direction: column;
          text-align: center;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin: 20px 0 0;
          color: #007b50;
          font-weight: bold;
          font-size: 30px;
          h2 {
            text-decoration: underline;
          }
          img {
            width: 350px;
            height: 300px;
          }
        }
        .body {
          display: flex;
          flex-direction: column;
          margin: 0 0 20px;
          padding: 20px;
          border: 4px solid #007b50;
        }
        .footer {
          margin: 0 0 40px;
        }
        .body3 {
          text-align: center;
        }
      </style>
    
    </head>
    
    <body>
      <div class="container">
        <div class="header">
          <h1>THÔNG TIN ĐÓNG GÓP</h1>
          <img style="width: 140px; height: 100px;" src="https://i.pinimg.com/originals/0c/e3/67/0ce3678db6f4abe43408ad7b1e988a4b.gif" alt="i">
        </div>
        <div class="body">
          <div>
            <div style="margin: 8px 0;">
              <span>Chiến dịch: </span>
              <span style="font-weight: bold; text-transform: uppercase;">${gift.campaignTitle}</span>
            </div>
          </div>
          <div style="height: 2px; background-color: #007b50; width: 100%; margin: 14px 0;"></div>
          <div class="">
            <span style="font-size: 16px; font-weight: bold;">Danh sách đặc quyền bao gồm: </span>
    
            ${gift.perks.map(item => {
        return `<div style="margin-left: 20px; margin-top: 10px;">
                <b style="font-style: italic;">${item.perkTitle} x ${item.quantity}</b>
                <ul style="margin-left: 40px;">
                    ${item.options.map(i => {
            return `<li>${i.name}: ${i.optionsString}</li>`
        }).join('')}
                </ul>
              </div>`
    }).join('')}
    
            
            
          </div>
          <div style="height: 2px; background-color: #007b50; width: 100%; margin: 14px 0;"></div>
          <div class="body3">
            <span style="margin: 10px 0 30px; font-weight: bold; font-style: italic; text-decoration: underline;">THÔNG TIN GIAO NHẬN</span>
            <div style="margin: 20px 0 8px;">
              <span>Họ tên người nhận: </span>
              <span style="font-weight: bold;">${gift.shippingInfo.fullName}</span>
            </div>
            <div style="margin: 8px 0;">
              <span>Điah chỉ nhận: </span>
              <span style="font-weight: bold;">${gift.shippingInfo.detail}, ${gift.shippingInfo.ward}, ${gift.shippingInfo.district}, ${gift.shippingInfo.province}</span>
            </div>
            <div style="margin: 8px 0;">
              <span>Số điện thoại: </span>
              <span style="font-weight: bold;">${gift.shippingInfo.phoneNumber}</span>
            </div>
            <div style="margin: 8px 0;">
              <span>Ngày dự kiến nhận: </span>
              <span style="font-weight: bold;">${date}</span>
            </div>
          </div>
        </div>
        <div class="footer">
          <span style="color: #007b50; font-weight: bold; font-size: 20px;">GiveFun cảm ơn bạn đã ủng hộ chiến dịch</span>
        </div>
      </div>
    </body>
    </html>`
}
export default {
    getQuantityPeople,
    getMoneyByCampaign,
    handlePayment,
    handleSuccess,
    getAllContributionsByCampaign,
    editStatus,
    getTopUserContributionByCampaign,
    getQuantityContributeOfUserId,
    getAllContributionsOfUser,
}