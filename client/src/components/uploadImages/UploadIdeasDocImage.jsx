import AnimatedImageUpload from "./AnimatedImageUpload";

function UploadIdeasDocImage({ onClose, onUploadSuccess }) {
    return (
        <AnimatedImageUpload
            title="Ideas Document Image"
            uploadEndpoint="/api/file/ideas-doc"
            onClose={onClose}
            onUploadSuccess={onUploadSuccess}
        />
    );
}

export default UploadIdeasDocImage;