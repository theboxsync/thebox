import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../style.css";

import AddQSRModal from "./AddQSRModal";
import DeleteQsrModal from "./DeleteQsrModal";
import EditQsrModal from "./EditQsrModal";

import { AuthContext } from "../../../context/AuthContext";
import Loading from "../../../components/Loading";

const AdminManageQSR = ({ setQsrName }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mainSection, setMainSection] = useState("Dashboard");
  const { userSubscriptions, activePlans } = useContext(AuthContext);

  const [QsrData, setQsrData] = useState([]);
  const [showAddQsrModal, setShowAddQsrModal] = useState(false);
  const [showEditQsrModal, setShowEditQsrModal] = useState(false);
  const [showDeleteQsrModal, setShowDeleteQsrModal] = useState(false);

  const fetchQsrData = async () => {
    const hasQSRPlan = userSubscriptions.some(
      (subscription) =>
        subscription.plan_name === "QSR" && activePlans.includes("QSR")
    );

    if (!hasQSRPlan) {
      alert("You need to buy or renew to QSR plan to access this page.");
      navigate("/subscription");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/qsr/getqsrdata`,
        {
          withCredentials: true,
        }
      );
      setQsrData(response.data);
      if (response.data.length > 0) {
        setQsrName(response.data[0].username);
      }
    } catch (error) {
      console.log("Error fetching qsr data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userSubscriptions.length > 0) {
      fetchQsrData();
    }
  }, [activePlans, userSubscriptions]);

  const [editQsrModalData, setEditQsrModalData] = useState({});
  const editQsrModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/qsr/getQsrdata/${id}`)
      .then((res) => {
        setEditQsrModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setShowEditQsrModal(true);
  };

  const [deleteQsrModalData, setDeleteQsrModalData] = useState({
    id: "",
  });
  const deleteQsrModal = (id) => {
    console.log(id);
    setShowDeleteQsrModal(true);
    setDeleteQsrModalData({ ...deleteQsrModalData, id: id });
    console.log(deleteQsrModalData);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {QsrData.length === 0 ? (
        <>
          <button
            className="btn btn-transparent bg-transparent"
            title="Add"
            onClick={() => setShowAddQsrModal(true)}
          >
            <img
              src="../../dist/img/icon/add.svg"
              alt="edit Details"
              style={{ filter: "invert(100%)" }}
            />
          </button>
        </>
      ) : (
        QsrData.map((qsr) => (
          <div key={qsr._id}>
            <button
              className="btn btn-transparent bg-transparent"
              title="Edit"
              onClick={() => editQsrModal(qsr._id)}
            >
              <img src="../../dist/img/icon/edit-b.svg" alt="edit Details" />
            </button>
            <button
              className="btn btn-transparent bg-transparent"
              title="delete"
              onClick={() => deleteQsrModal(qsr._id)}
            >
              <img
                src="../../dist/img/icon/delete-b.svg"
                alt="delete Details"
              />
            </button>
          </div>
        ))
      )}

      <AddQSRModal
        show={showAddQsrModal}
        handleClose={() => setShowAddQsrModal(false)}
        fetchQsrData={fetchQsrData}
      />

      <EditQsrModal
        show={showEditQsrModal}
        handleClose={() => setShowEditQsrModal(false)}
        data={editQsrModalData}
        fetchQsrData={fetchQsrData}
      />

      <DeleteQsrModal
        show={showDeleteQsrModal}
        handleClose={() => setShowDeleteQsrModal(false)}
        data={deleteQsrModalData}
        fetchQsrData={fetchQsrData}
      />
    </>
  );
};

export default AdminManageQSR;
