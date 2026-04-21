import AnimatedImageUpload from "./AnimatedImageUpload";

function UploadProfileImage({ onClose, onUploadSuccess }) {
    return (
        <AnimatedImageUpload
            title="Profile Image"
            uploadEndpoint="/file/upload-profile"
            onClose={onClose}
            onUploadSuccess={onUploadSuccess}
        />
    );
}

export default UploadProfileImage