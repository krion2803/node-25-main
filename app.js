
// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const app = express()
// const PORT = 3000
// app.use(cors())
// app.use(express.json()) 
// app.use(express.urlencoded({ extended: true }));

// mongoose.connect("mongodb://localhost:27017/xyy").then(()=>{
//     console.log("database connected...")
// })


// //  role routes
// const roleRoutes = require('./src/routes/RoleRoutes')
// app.use(roleRoutes)


// // user route
// const userRoutes = require('./src/routes/UserRoutes')
// app.use(userRoutes)

    
// // template route
// const templateRoutes = require('./src/routes/TemplateRoutes')
// app.use('/template',templateRoutes)

// //forms route
// const formRoutes = require('./src/routes/FormRoutes')
// app.use('/form',formRoutes)

// //RESUMEROUTE
// const resumeRoutes = require('./src/routes/ResumeRoutes')
// app.use(resumeRoutes)

// app.listen(PORT , ()=>{
//     console.log(`server is started on localhost:${PORT}`)
// })

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const path =require('path')
const PORT = 3000
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect("mongodb://localhost:27017/xyy").then(()=>{
    console.log("database connected...")
})


//  role routes
const roleRoutes = require('./src/routes/RoleRoutes')
app.use(roleRoutes)


// user route
const userRoutes = require('./src/routes/UserRoutes')
app.use(userRoutes)

    
// template route
const templateRoutes = require('./src/routes/TemplateRoutes')
app.use('/template',templateRoutes)

//forms route

const formRoutes = require('./src/routes/FormRoutes')
app.use('/form',formRoutes)

//RESUMEROUTE
const resumeRoutes = require('./src/routes/ResumeRoutes')
app.use(resumeRoutes)

//activity
const activityRoutes = require('./src/routes/ActivityRoutes')
app.use(activityRoutes)

app.listen(PORT , ()=>{
    console.log(`server is started on localhost:${PORT}`)
})
































// app.get("/user",(req,res)=>{
//         console.log("User Is created")
//         res.send('hello user')
// })

// app.get("/",(req,res)=>{
//     console.log("User Is Json format")
//     res.json({
//         data:"badal",
//         message:"message for user "
//     })
// })

// app.get('/employee', (req,res)=>{
//     res.json({
//         Employe1:({
//                 name:"Badal",
//                 age:20,
//                 role:"Computer Enginnring",
//                 Gender:"Male",
//                 isActive:true,

//         }),
//         Employe2:({
//             name:"Manav",
//             age:20,
//             role:"Computer Enginnring",
//             Gender:"Male",
//             isActive:true,

//     }),     
//        Employe3:({
//         name:"kartik",
//         age:20,
//         role:"Computer Enginnring",
//         Gender:"Male",
//         isActive:true,

// }),      
//   Employe4:({
//     name:"Seeta",
//     age:22,
//     role:"Software Enginnring",
//     Gender:"Female",
//     isActive:true,

// }),     
//    Employe5:({
//     name:"Geeta",
//     age:23,
//     role:"Design Enginnring",
//     Gender:"Female",
//     isActive:true,

// }),       
//  Employe6:({
//     name:"Amit",
//     age:30,
//     role:"Civil Enginnring",
//     Gender:"Male",
//     isActive:false,

// }),    

// Employe7:({
//     name:"Param",
//     age:20,
//     role:"Computer Enginnring",
//     Gender:"Male",
//     isActive:true,

// }),    
//     Employe8:({
//     name:"Shyam",
//     age:25,
//     role:"Electical Enginnring",
//     Gender:"Male",
//     isActive:false,

// }),    
//     Employe9:({
//     name:"Ishita",
//     age:21,
//     role:"Computer Enginnring",
//     Gender:"Female",
//     isActive:true,

// }),    
//     Employe10:({
//     name:"Meet",
//     age:21,
//     role:"Design Enginnring",
//     Gender:"Male",
//     isActive:true,

// }),   
//      Employe11:({
//     name:"Harsh",
//     age:19,
//     role:"Mechanical Enginnring",
//     Gender:"Male",
//     isActive:true,

// })
//     })
// })












// console.log("User")
// let user = require("./user")
// console.log(user)
// console.log(user.userName)
// console.log(user.userAge)
// console.log(user.printuser)
// user.printuser()