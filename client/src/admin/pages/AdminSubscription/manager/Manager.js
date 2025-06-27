import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../style.css";

import AddManagerModal from "./AddManagerModal.js";
import DeleteManagerModal from "./DeleteManagerModal.js";
import EditManagerModal from "./EditManagerModal.js";

import Loading from "../../../components/Loading";

import { AuthContext } from "../../../context/AuthContext.jsx";

const Manager = ({ setManagerName }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { userSubscriptions, activePlans } = useContext(AuthContext);

  const [ManagerData, setManagerData] = useState([]);
  const [showAddManagerModal, setShowAddManagerModal] = useState(false);
  const [showEditManagerModal, setShowEditManagerModal] = useState(false);
  const [showDeleteManagerModal, setShowDeleteManagerModal] = useState(false);

  const fetchManagerData = async () => {
    const hasManagerPlan = userSubscriptions.some(
      (subscription) =>
        subscription.plan_name === "Manager" && activePlans.includes("Manager")
    );

    if (!hasManagerPlan) {
      alert("You need to renew to Manager plan to access this page.");
      navigate("/subscription");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/manager/getmanagerdata`,
        { withCredentials: true }
      );
      setManagerData(response.data);
      if(response.data.length > 0){
        setManagerName(response.data[0].username);
      }
    } catch (error) {
      console.log("Error fetching manager data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userSubscriptions.length > 0) {
      fetchManagerData();
    }
  }, [activePlans, userSubscriptions]);

  const [editManagerModalData, setEditManagerModalData] = useState({});
  const addManagerModal = (id) => {
    console.log(id);
    setShowAddManagerModal(true);
  };
  const editManagerModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/manager/getmanagerdata/${id}`)
      .then((res) => {
        setEditManagerModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setShowEditManagerModal(true);
  };

  const [deleteManagerModalData, setDeleteManagerModalData] = useState({
    id: "",
  });
  const deleteManagerModal = (id) => {
    console.log(id);
    setShowDeleteManagerModal(true);
    setDeleteManagerModalData({ ...deleteManagerModalData, id: id });
    console.log(deleteManagerModalData);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {ManagerData.length === 0 ? (
        <>
          <button
            className="btn btn-transparent bg-transparent"
            title="Add"
            onClick={() => addManagerModal()}
          >
            <img
              src="../../dist/img/icon/add.svg"
              alt="edit Details"
              style={{ filter: "invert(100%)" }}
            />
          </button>
        </>
      ) : (
        ManagerData.map((manager) => (
          <div key={manager._id}>
            <button
              className="btn btn-transparent bg-transparent"
              title="Edit"
              onClick={() => editManagerModal(manager._id)}
            >
              <img src="../../dist/img/icon/edit-b.svg" alt="edit Details" />
            </button>
            <button
              className="btn btn-transparent bg-transparent"
              title="delete"
              onClick={() => deleteManagerModal(manager._id)}
            >
              <img
                src="../../dist/img/icon/delete-b.svg"
                alt="delete Details"
              />
            </button>
          </div>
        ))
      )}

      <AddManagerModal
        show={showAddManagerModal}
        handleClose={() => setShowAddManagerModal(false)}
        fetchManagerData={fetchManagerData}
      />

      <EditManagerModal
        show={showEditManagerModal}
        handleClose={() => setShowEditManagerModal(false)}
        data={editManagerModalData}
        fetchManagerData={fetchManagerData}
      />

      <DeleteManagerModal
        show={showDeleteManagerModal}
        handleClose={() => setShowDeleteManagerModal(false)}
        data={deleteManagerModalData}
        fetchManagerData={fetchManagerData}
      />
    </>
  );
};

export default Manager;
