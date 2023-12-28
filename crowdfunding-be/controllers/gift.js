import { Campaign, Gift, User } from "../model/index.js";
import nodemailer from 'nodemailer';
import mongoose from "mongoose"

const addGift = async (req, res) => {
    try {
        const gift = req.body;
        const newGift = await Gift.create(gift);
        const user = await User.findById(gift.user).exec()
        const campaign = await Campaign.findById(gift.campaign).exec()
        await sendMail({
            email: user.email,
            title: '[GIVEFUN] - QUÀ TẶNG CHIẾN DỊCH',
            templateHTML: templateGiveGift({
                ...gift,
                campaignTitle: campaign.title,
            })
        })
        res.status(200).json({
            message: 'Lưu quà tặng thành công'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getAllGiftsByCampaign = async (req, res) => {
    try {
        const { id } = req.params
        let { page = 1, size = 15, status = 'Tất cả', searchString = '', time = 'Tất cả' } = req.query;
        page = parseInt(page);
        size = parseInt(size)
        size = size >= 15 ? 15 : size
        const aggregationStages = [
            {
                $lookup: {
                    from: 'users', // Tên bảng User
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user' // Chuyển mảng 'user' thành các documents riêng lẻ
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
            {
                $match: {
                    $and: [
                        {
                            isFinish: status === 'Tất cả' ? { $ne: 'Tất cả' } : (status === 'Chưa gửi' ? false : true)
                        },
                        {
                            'user.email': { $regex: `.*${searchString}.*`, $options: 'i' }
                        },
                        
                        {
                            campaign: new mongoose.Types.ObjectId(id)
                        }
                    ]

                }
            }
        ];
     
        if (time === 'Tất cả') {
            aggregationStages.push(
                {
                    $sort: {
                        'shippingInfo.estDelivery': -1
                    }
                }
            );
        }

        // Thực hiện sắp xếp theo trường date giảm dần
        if (time !== 'Tất cả') {
            aggregationStages.push(
                {
                    $sort: {
                        'shippingInfo.estDelivery': time === 'Trễ nhất' ? -1 : 1
                    }
                }
            );
        }

        const filterGifts = await Gift.aggregate(aggregationStages);


        const totalRecords = await Gift.countDocuments({ campaign: id });
        const totalPages = Math.ceil(totalRecords / size);
        res.status(200).json({
            message: 'Lấy thông tin các quà tặng  thành công',
            data: {
                gifts: filterGifts,
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
        await Gift.findByIdAndUpdate(id, { isFinish }).exec()
        res.status(200).json({
            message: 'Cập nhật trạng thái gửi quà thành công'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
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
          <h1>TRI ÂN NGƯỜI ĐÓNG GÓP</h1>
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
            <span style="font-size: 16px; font-weight: bold;">Danh sách quà bao gồm: </span>
    
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
    addGift,
    getAllGiftsByCampaign,
    editStatus
}