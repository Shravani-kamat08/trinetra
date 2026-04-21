import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, Image as ImageIcon, Loader2 } from "lucide-react";
import api from "../../util/api";
import { toast } from "react-toastify";

function AnimatedImageUpload({ title, uploadEndpoint, onClose, onUploadSuccess }) {
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = async (file) => {
        const uploadData = new FormData();
        uploadData.append("image", file);

        try {
            setIsUploading(true);
            setError("");

            const res = await api.post(uploadEndpoint, uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const finalUrl = res.data.imageUrl;
            console.log("Final URL: ", res.data);
            setImageUrl(finalUrl);

            if (onUploadSuccess) {
                onUploadSuccess(finalUrl);
            }

            toast.success("Image uploaded successfully!");
        } catch (err) {
            setError("Upload failed. Please try again.");
            toast.error("Upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            handleUpload(file);
        } else {
            setError("Please select a valid image.");
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 1050 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 50, opacity: 0 }}
                    className="bg-white rounded shadow-lg w-100"
                    style={{ maxWidth: "500px", overflow: "hidden" }}
                >
                    {/* HEADER */}
                    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                        <h5 className="mb-0">{title}</h5>
                        <button onClick={onClose} className="btn btn-sm btn-outline-danger">
                            <X size={18} />
                        </button>
                    </div>

                    {/* BODY */}
                    <div className="p-4 text-center">

                        <div
                            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle position-relative"
                            style={{
                                width: "180px",
                                height: "180px",
                                background: "#e9ecef",
                                overflow: "hidden"
                            }}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                <ImageIcon size={60} className="text-secondary" />
                            )}

                            {isUploading && (
                                <div
                                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                    style={{ background: "rgba(0,0,0,0.5)" }}
                                >
                                    <Loader2 size={35} className="text-white spin" />
                                </div>
                            )}
                        </div>

                        {error && <p className="text-danger small">{error}</p>}
                    </div>

                    {/* FOOTER */}
                    <div className="p-3 border-top text-center">
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="btn btn-warning"
                        >
                            <UploadCloud size={18} className="me-2" />
                            {imageUrl ? "Change Image" : "Upload Image"}
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="d-none"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default AnimatedImageUpload;