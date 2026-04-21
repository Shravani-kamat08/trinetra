import React, { useEffect, useState } from "react";
import api from "../../util/api";
import "./IicTeam.css";
import UploadProfileImage from "../uploadImages/UploadProfileImage";

/* ================= FORM MODAL (ADD) ================= */
const IicFormModal = ({ onCloseModal, onSuccess }) => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    qualification: "",
    experience: "",
    profilePic: ""
  });
  const [showUpload, setShowUpload] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (url) => {
    setFormData({ ...formData, profilePic: url });
    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/iic/create", formData);
      if (res.data.success) {
        onSuccess();
        onCloseModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Add Member</h2>
        <form onSubmit={handleSubmit} className="modal-grid">
          <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
          <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
          <input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} />
          <input name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
          
          <button type="button" onClick={() => setShowUpload(true)} style={{ gridColumn: "span 2" }}>
            {formData.profilePic ? "Image Uploaded ✓" : "Upload Profile Image"}
          </button>

          <div className="modal-actions" style={{ gridColumn: "span 2" }}>
            <button type="button" className="cancel-btn" onClick={onCloseModal}>Cancel</button>
            <button type="submit" className="save-btn">Add</button>
          </div>
        </form>
      </div>
      {showUpload && <UploadProfileImage onClose={() => setShowUpload(false)} onUploadSuccess={handleUploadSuccess} />}
    </div>
  );
};

/* ================= MODAL COMPONENT (EDIT) ================= */
const MemberModal = ({ member, onCloseModal, onSave }) => {
  const [form, setForm] = useState(member);
  const [showUpload, setShowUpload] = useState(false);

  if (!member) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (url) => {
    setForm({ ...form, profilePic: url });
    setShowUpload(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Member</h2>
        <div className="modal-grid">
          <input name="role" value={form.role} onChange={handleChange} />
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="email" value={form.email} onChange={handleChange} />
          <input name="phone" value={form.phone} onChange={handleChange} />
          <input name="department" value={form.department} onChange={handleChange} />
          <input name="designation" value={form.designation} onChange={handleChange} />
          <input name="qualification" value={form.qualification} onChange={handleChange} />
          <input name="experience" value={form.experience} onChange={handleChange} />
          
          <button type="button" onClick={() => setShowUpload(true)} style={{ gridColumn: "span 2" }}>
             {form.profilePic ? "Change Image" : "Upload Profile Image"}
          </button>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCloseModal}>Cancel</button>
          <button className="save-btn" onClick={() => onSave(form)}>Save</button>
        </div>
      </div>
      {showUpload && <UploadProfileImage onClose={() => setShowUpload(false)} onUploadSuccess={handleUploadSuccess} />}
    </div>
  );
};

/* ================= DELETE CONFIRM ================= */
const ConfirmModal = ({ onConfirm, onCancelModal }) => {
  return (
    <div className="modal-overlay" onClick={onCancelModal}>
      <div className="modal-card small" onClick={(e) => e.stopPropagation()}>
        <h3>Are you sure you want to delete?</h3>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancelModal}>No</button>
          <button className="delete-btn" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
const IicTeam = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const userMode = localStorage.getItem("userMode");

  const fetchMembers = async () => {
    try {
      const res = await api.get("/iic");
      if (res.data.success) {
        setMembers(res.data.members);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleView = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleSave = async (updatedData) => {
    try {
      const res = await api.put(`/iic/${updatedData._id}`, updatedData);
      if (res.data.success) {
        setShowModal(false);
        fetchMembers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/iic/${deleteId}`);
      setDeleteId(null);
      fetchMembers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="iic-container">
      <h2>IIC Council Team</h2>
      <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Member</button>

      <div className="table-wrapper">
        <table className="iic-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Profile Image</th>
              <th>Name & Details</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Qualification</th>
              <th>Experience</th>
              {userMode === "Admin" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m._id}>
                <td>{m.role}</td>
                <td>
                  {m.profilePic ? (
                    <img src={m.profilePic} alt={m.name} className="adminDashboard-img" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  <strong>{m.name}</strong><br />
                  {m.email}<br />
                  {m.phone}
                </td>
                <td>{m.department}</td>
                <td>{m.designation}</td>
                <td>{m.qualification}</td>
                <td>{m.experience} yrs</td>
                {userMode === "Admin" && (
                  <td>
                    <button onClick={() => handleView(m)}>👁️</button>
                    <button onClick={() => handleView(m)}>✏️</button>
                    <button onClick={() => handleDeleteClick(m._id)}>🗑️</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <MemberModal
          member={selectedMember}
          onCloseModal={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
      {deleteId && (
        <ConfirmModal
          onConfirm={confirmDelete}
          onCancelModal={() => setDeleteId(null)}
        />
      )}
      {showForm && (
        <IicFormModal
          onCloseModal={() => setShowForm(false)}
          onSuccess={fetchMembers}
        />
      )}
    </div>
  );
};

export default IicTeam;