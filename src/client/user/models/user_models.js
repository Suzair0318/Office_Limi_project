const mongoose  = require('mongoose');

const Use_Schema = new  mongoose.Schema({
     username : {
         type  : String,
         require : true,
     },

     email :  {
         type  : String,
         require : true,
     },
     
     otp : {
         type : String
     },

     otp_expire_at : {
       type  : Date
     },

     roles :  {
         type : String,
         enum : ['installer', 'user'],
         default : 'installer',
     },
     devices: [
        { 
            device_id: { type: String, ref: "Device" }, 
            addedAt: { type: Date, default: Date.now } // 🔥 Track device added time
        }
     ], // Devices array
},{timestamps : true});

// 🔥 Virtual Populate (device_id ko `Device` model se connect karne ke liye)
Use_Schema.virtual('device_details', {
    ref: 'Device',
    localField: 'devices.device_id',  // 🔥 Correct field path
    foreignField: 'device_id', // 🔥 Device model ka field
    justOne: false, 
});

// 🔥 Virtuals enable karo takay JSON aur Objects me aayein
Use_Schema.set('toObject', { virtuals: true });
Use_Schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', Use_Schema);