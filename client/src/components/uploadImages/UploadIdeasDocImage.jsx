import AnimatedImageUpload from "./AnimatedImageUpload";

function UploadIdeasDocImage({ onClose, onUploadSuccess }) {
    return (
        <AnimatedImageUpload
            title="Ideas Document Image"
            uploadEndpoint="/file/idea-docs"
            onClose={onClose}
            onUploadSuccess={onUploadSuccess}
        />
    );
}

export default UploadIdeasDocImage;