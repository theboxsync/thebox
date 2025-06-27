import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../style.css";

import AddCaptainModal from "./AddCaptainModal";
import EditCaptainModal from "./EditCaptainModal.js";
import DeleteCaptainModal from "./DeleteCaptainModal.js";

import { AuthContext } from "../../../context/AuthContext.jsx";
import Loading from "../../../components/Loading";

const AdminManageCaptain = ({ setCaptainName }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddCaptainModal, setShowAddCaptainModal] = useState(false);
  const { userSubscriptions, activePlans } = useContext(AuthContext);

  const [CaptainData, setCaptainData] = useState([]);
  const [showEditCaptainModal, setShowEditCaptainModal] = useState(false);
  const [showDeleteCaptainModal, setShowDeleteCaptainModal] = useState(false);

  const fetchCaptainData = async () => {
    const hasCaptainPlan = userSubscriptions.some(
      (subscription) =>
        subscription.plan_name === "Captain Panel" &&
        activePlans.includes("Captain Panel")
    );

    if (!hasCaptainPlan) {
      alert(
        "You need to buy or renew to Captain Panel plan to access this page."
      );
      navigate("/subscription");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/captain/getcaptaindata`,
        {
          withCredentials: true,
        }
      );
      setCaptainData(response.data);
      if (response.data.length > 0) {
        setCaptainName(response.data[0].username);
      }
    } catch (error) {
      console.log("Error fetching captain data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userSubscriptions.length > 0) {
      fetchCaptainData();
    }
  }, [activePlans, userSubscriptions]);

  const [editCaptainModalData, setEditCaptainModalData] = useState({});
  const editCaptainModal = (id) => {
    console.log(id);
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/captain/getcaptaindata/${id}`)
      .then((res) => {
        setEditCaptainModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setShowEditCaptainModal(true);
  };

  const [deleteCaptainModalData, setDeleteCaptainModalData] = useState({
    id: "",
  });
  const deleteCaptainModal = (id) => {
    console.log(id);
    setShowDeleteCaptainModal(true);
    setDeleteCaptainModalData({ ...deleteCaptainModalData, id: id });
    console.log(deleteCaptainModalData);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {CaptainData.length === 0
        ? (console.log("Captain Data: ", CaptainData),
          (
            <>
              <button
                className="btn btn-transparent bg-transparent"
                title="Add"
                onClick={() => setShowAddCaptainModal(true)}
              >
                <img
                  src="../../dist/img/icon/add.svg"
                  alt="edit Details"
                  style={{ filter: "invert(100%)" }}
                />
              </button>
            </>
          ))
        : CaptainData.map((captain) => (
            <div key={captain._id}>
              <button
                className="btn btn-transparent bg-transparent"
                title="Edit"
                onClick={() => editCaptainModal(captain._id)}
              >
                <img src="../../dist/img/icon/edit-b.svg" alt="edit Details" />
              </button>
              <button
                className="btn btn-transparent bg-transparent"
                title="delete"
                onClick={() => deleteCaptainModal(captain._id)}
              >
                <img
                  src="../../dist/img/icon/delete-b.svg"
                  alt="delete Details"
                />
              </button>
            </div>
          ))}

      <AddCaptainModal
        show={showAddCaptainModal}
        handleClose={() => setShowAddCaptainModal(false)}
        fetchCaptainData={fetchCaptainData}
      />

      <EditCaptainModal
        show={showEditCaptainModal}
        handleClose={() => setShowEditCaptainModal(false)}
        data={editCaptainModalData}
        fetchCaptainData={fetchCaptainData}
      />

      <DeleteCaptainModal
        show={showDeleteCaptainModal}
        handleClose={() => setShowDeleteCaptainModal(false)}
        data={deleteCaptainModalData}
        fetchCaptainData={fetchCaptainData}
      />
    </>
  );
};

export default AdminManageCaptain;
