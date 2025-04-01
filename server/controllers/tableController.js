const Table = require("../models/tableModel");

const getTableData = (req, res) => {
  try {
    Table.find({ hotel_id: req.user })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getTableDataById = (req, res) => {
  try {
    const tableId = req.params.id;
    Table.findOne({ "tables._id": tableId })
      .then((data) => {
        const area = data.area;
        const table = data.tables.find((t) => t._id.toString() === tableId);
        const tableData = { ...table.toObject(), area };
        res.json(tableData);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getDiningAreas = async (req, res) => {
  try {
    const areas = await Table.find({ hotel_id: req.user }, "area"); // Fetch distinct areas
    const uniqueAreas = [...new Set(areas.map((item) => item.area))];
    res.json(uniqueAreas);
  } catch (error) {
    console.error("Error fetching dining areas:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkTable = (req, res) => {
  try {
    console.log(req.query);
    const { area, table_no } = req.query;
    Table.findOne({ area, "tables.table_no": table_no, hotel_id: req.user })
      .then((data) => {
        if (data) {
          res.json({ exists: true });
        } else {
          res.json({ exists: false });
        }
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const addTable = (req, res) => {
  try {
    console.log(req.body);
    const tableData = { ...req.body, hotel_id: req.user };
    const area = req.body.area;

    Table.findOne({ area: area, hotel_id: req.user }).then((data) => {
      if (data) {
        Table.findOneAndUpdate(
          { area: area, hotel_id: req.user },
          {
            $push: { tables: req.body.tables },
          }
        )
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
      } else {
        Table.create(tableData)
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTable = (req, res) => {
  try {
    const tableData = req.body;
    Table.updateOne({ _id: tableData._id }, tableData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const deleteTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const tableData = await Table.findOne({ "tables._id": tableId });
    if (!tableData) {
      return res.status(404).json({ message: "Table not found" });
    } else {
      const area = tableData.area;
      const result = await Table.updateOne(
        { "tables._id": tableId },
        { $pull: { tables: { _id: tableId } } }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Table not found" });
      }
      const updatedArea = await Table.findOne({ area, hotel_id: req.user });
      if (updatedArea.tables.length === 0) {
        await Table.deleteOne({ area });
      }
      res.status(200).json({ message: "Table deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getTableData,
  getTableDataById,
  getDiningAreas,
  checkTable,
  addTable,
  updateTable,
  deleteTable,
};
