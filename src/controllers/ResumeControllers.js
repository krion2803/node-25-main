const resumeModel = require('../models/ResumeModels')

const addResume = async(req,res)=>{

try {
    const savedResume = await resumeModel.create(req.body)
    res.json({
        message:"resume Model is created",
        data:savedResume
    })
} catch (error) {
    res.json({
        "error":error.message
})

}
}

const getIdByResume = async(req,res)=>{
    try {
        const resume = await resumeModel.findById(req.params.id)
        .populate("templateId")
        .populate("userId")
        .populate("userFormId")

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
          }
          console.log("Fetched Resume Data:", resume); 
        res.json({
            message:"resume with tempate id",
            data:resume
        })
    } catch (error) {
        res.json({error})
    }
}

const deleteResume = async (req,res)=>{
    try {
        const deletedResume = await templateModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"Resume Was Deleted !!",
            data:deletedResume
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports ={addResume,getIdByResume,deleteResume}