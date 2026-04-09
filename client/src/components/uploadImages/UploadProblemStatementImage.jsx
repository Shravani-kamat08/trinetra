import AnimatedImageUpload from "./AnimatedImageUpload";

function UploadProblemStatementImage({ onClose, onUploadSuccess }) {
    return (
        <AnimatedImageUpload
            title="Problem Statement Image"
            uploadEndpoint="/api/file/problem-statement"
            onClose={onClose}
            onUploadSuccess={onUploadSuccess}
        />
    );
}

export default UploadProblemStatementImage;

