// const templateModel = require('../models/TemplateModels')

// const addTemplate = async (req,res)=>{

//         try {
//             const savedTemplate =await templateModel.create(req.body)
//             res.json({
//                 message:"Template was added...",
//                 data:savedTemplate
//             })
//         } catch (error) {
//             res.status(500).json({error})
//         }
//     }

// const getAllTemplate = async(req,res)=>{
//     try {
//         const getTemplate = await templateModel.find()
//         res.json({
//             message:"All Template...",
//             data:getTemplate
//         })
//     } catch (error) {
//         res.status(500).json({error})
//     }
// }

// const deleteTemplate = async (req,res)=>{
//     try {
//         const deletedTemplate = await templateModel.findByIdAndDelete(req.params.id)
//         res.json({
//             message:"Template Was Deleted !!",
//             data:deletedTemplate
//         })
//     } catch (error) {
//         res.status(500).json({error})
//     }
// }

// const getTemplatebyId = async(req,res)=>{
//     try {
//         const getId = await templateModel.findById(req.params.id)
//         res.json({
//             message:"Template Id is Fetched !!",
//             data:getId
//         })
//     } catch (error) {
//         res.status(500).json({error})

//     }
// }

// module.exports ={addTemplate,getAllTemplate,deleteTemplate,getTemplatebyId}
const templateModel = require('../models/TemplateModels')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 🔹 Images `uploads/` Folder Me Save Hogi
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
}).single("previewImg")

const addTemplate = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: "File upload failed" });
        }

        try {
            console.log("Received Data:", req.body); // 🟢 Debugging
            console.log("Uploaded File:", req.file); // 🟢 Check if file is received

            const { name, desc } = req.body;
            const previewImg = req.file ? `/uploads/${req.file.filename}` : "";

            const savedTemplate = await templateModel.create({ name, desc, previewImg });

            return res.json({
                message: "Template was added...",
                data: savedTemplate,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};


const getAllTemplate = async (req, res) => {
    try {
        const getTemplate = await templateModel.find()
        res.json({
            message: "All Template...",
            data: getTemplate
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const deleteTemplate = async (req, res) => {
    try {
        const deletedTemplate = await templateModel.findByIdAndDelete(req.params.id)
        res.json({
            message: "Template Was Deleted !!",
            data: deletedTemplate
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const getTemplatebyId = async (req, res) => {
    try {
        const getId = await templateModel.findById(req.params.id)
        res.json({
            message: "Template Id is Fetched !!",
            data: getId
        })
    } catch (error) {
        res.status(500).json({ error })

    }
}

module.exports = { addTemplate, getAllTemplate, deleteTemplate, getTemplatebyId }