
import axios from "axios";
import baseURL from "~/utils/baseURL";
export default class CustomUploadCKEAdapter{
    constructor(loader) {
        this.loader = loader;
    }

    upload = () => {
        return this.loader.file.then((file) => new Promise((resolve,reject) => {
            // upload image server
            console.log(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                let result = reader.result;
                axios.patch(`${baseURL}/campaign/CKEUpload`,{file:result}).then(res => {
                    resolve({
                        default: res.data.url
                    })
                }).catch(err => {
                    reject(err)
                })
            }
            
        }))
    }
}
    // .create( document.querySelector( '#editor' ), {
    //     plugins: [ SimpleUploadAdapter, /* ... */ ],
    //     toolbar: [ /* ... */ ],
    //     simpleUpload: {
    //         // The URL that the images are uploaded to.
    //         uploadUrl: 'http://example.com',

    //         // Enable the XMLHttpRequest.withCredentials property.
    //         withCredentials: true,

    //         // Headers sent along with the XMLHttpRequest to the upload server.
    //         headers: {
    //             'X-CSRF-TOKEN': 'CSRF-Token',
    //             Authorization: 'Bearer <JSON Web Token>'
    //         }
    //     }
    // } )
    // .then( /* ... */ )
    // .catch( /* ... */ );