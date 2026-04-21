import AnimatedImageUpload from "./AnimatedImageUpload";

function UploadProblemStatementImage({ onClose, onUploadSuccess }) {
    return (
        <AnimatedImageUpload
            title="Problem Statement Image"
            uploadEndpoint="/file/problem-statement"
            onClose={onClose}
            onUploadSuccess={onUploadSuccess}
        />
    );
}

export default UploadProblemStatementImage;

