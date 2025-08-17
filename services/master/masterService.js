const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createDropdown = async (type, value) => {
  const result = await prisma.masterDropdown.create({
    data: { type, value },
  });
  return result;
};


const getDropdownByType = async (type) => {
  return await prisma.masterDropdown.findMany({
    where: { type },
    select: { id: true, value: true },
  });
};

const newFeeStructures = async (req,res) => {
  try {
  
    const { classId, academicYear, numberOfTerms, feeItems } = req.body;
    const newFeeStructure = await prisma.feeStructure.create({
      data: {
        classId,
        academicYear,
        numberOfTerms,
        isActive: true, // default when creating
        totalAmount: feeItems.reduce((sum, item) => sum + item.amount, 0),
        feeItems: {
          create: feeItems.map(item => ({
            feeTypeId: item.feeTypeId,
            feeName: item.feeName,
            amount: item.amount,
            description: item.description || null
          }))
        }
      },
      include: {
        feeItems: {
          include: {
            feeType: true,  
          }
        }
      }
    });
    res.json(newFeeStructure);
  } catch (error) {
    console.log("newFeeStructures error",error)
    res.status(500).json({ error: error.message });
  }
};

const updateFeeStructures = async (req,res) => {
  try {
    const { classId, academicYear, numberOfTerms, feeItems,id } = req.body;
    // Delete old items
    await prisma.feeItem.deleteMany({ where: { feeStructureId: id } });
    // Update fee structure with new items
    const updated = await prisma.feeStructure.update({
      where: { id },
      data: {
        classId,
        academicYear,
        numberOfTerms,
        isActive: true, // default when creating
        totalAmount: feeItems.reduce((sum, item) => sum + item.amount, 0),
        feeItems: {
          create: feeItems.map(item => ({
            feeTypeId: item.feeTypeId,
            feeName: item.feeName,
            amount: item.amount,
            description: item.description || null
          }))
        }
      },
      include: { feeItems: true }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFeeStructures = async (req, res) => {
  try {
    const feeStructures = await prisma.feeStructure.findMany({
      include: {
        class: true,
        feeItems: {
          include: {
            feeType: true 
          }
        }
      }
    });
    res.json(feeStructures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
}

const getFeeStructuresByClassId = async (req, res) => {
  try {
    const classId = parseInt(req.params.classId);
    const feeStructure = await prisma.feeStructure.findMany({
      where: { classId },
      include: {
        class: true,
        feeItems: {
          include: { feeType: true } // Get fee type name from MasterDropdown
        }
      }
    });

    if (!feeStructure || feeStructure.length === 0) {
      return res.status(404).json({ message: "No fee structure found for this class" });
    }

    res.json(feeStructure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const createMarksSheetMaster = async (req,res) => {
  try {
    const { classId, sectionId, subjects } = req.body;

    const marksheet = await prisma.marksSheetMaster.create({
      data: {
        classId,
        sectionId,
        subjects: {
          create: subjects.map((s) => ({
            subjectId: s.subjectId,
            maxMarks: s.maxMarks,
            passMarks: s.passMarks,
            remark: s.remark || null
          }))
        }
      },
      include: {
        class: true,
        section: true,
        subjects: {
          include: { subject: true }
        }
      }
    });

    res.json(marksheet);
  } catch (error) {
    console.error("Error creating marksheet master:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateMarksSheetMaster = async (req,res) => {
  try {
    const { id, classId, sectionId, subjects } = req.body;
    // Update main master + replace subjects
    const updatedMarkSheet = await prisma.marksSheetMaster.update({
      where: { id: Number(id) },
      data: {
        classId,
        sectionId,
        subjects: {
          deleteMany: {}, // remove old subjects
          create: subjects.map((s) => ({
            subjectId: s.subjectId,
            maxMarks: s.maxMarks,
            passMarks: s.passMarks,
            remark: s.remark || null
          }))
        }
      },
      include: {
        class: true,
        section: true,
        subjects: {
          include: { subject: true }
        }
      }
    });

    res.json(updatedMarkSheet);
  } catch (error) {
    console.error("Error updating marksheet:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllMarkSheetMaster = async (req,res) => {
  try {
    const markSheets = await prisma.marksSheetMaster.findMany({
      include: {
        class: true,
        section: true,
        subjects: {
          include: { subject: true }
        }
      }
    });
    res.json(markSheets);
  } catch (error) {
    console.error("Error fetching marksheets:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllMarkssheetMasterByClassandSection = async (req,res) => {
  try {
    const { classId, sectionId } = req.params;

    const markSheets = await prisma.marksSheetMaster.findMany({
      where: {
        classId: Number(classId),
        sectionId: Number(sectionId),
      },
      include: {
        class: true,
        section: true,
        subjects: {
          include: { subject: true }
        }
      }
    });

    res.json(markSheets);
  } catch (error) {
    console.error("Error fetching marksheets by class & section:", error);
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  createDropdown,
  getDropdownByType,
  newFeeStructures,
  updateFeeStructures,
  getAllFeeStructures,
  getFeeStructuresByClassId,
  createMarksSheetMaster,
  updateMarksSheetMaster,
  getAllMarkSheetMaster,
  getAllMarkssheetMasterByClassandSection
}; 


