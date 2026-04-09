import AnimatedImageUpload from "./AnimatedImageUpload";

function UploadProfileImage({ onClose, onUploadSuccess }) {
    return (
        <AnimatedImageUpload
            title="Profile Image"
            uploadEndpoint="/api/file/profile"
            onClose={onClose}
            onUploadSuccess={onUploadSuccess}
        />
    );
}

export default UploadProfileImage;