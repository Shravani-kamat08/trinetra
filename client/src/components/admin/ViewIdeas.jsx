import React from "react";

const ViewIdeas = ({ ideas }) => {
    // Filter by likeStamp and sort by totalScore in descending order
    const sortedIdeas = [...ideas]
        .filter((idea) => idea.likeStamp)
        .sort((a, b) => b.totalScore - a.totalScore);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="table-container" id="printable-table">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Saved Ideas</h3>
                <button onClick={handlePrint} className="print-btn">Print Table</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Idea Title</th>
                        <th>Category</th>
                        <th>Student Name</th>
                        <th>Student Email</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedIdeas.map((idea, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{idea.title}</td>
                            <td>{idea.category}</td>
                            <td>
                                {
                                    idea?.students.map((student, idx) => (
                                        <span key={idx}>{student.name}, </span>
                                    ))
                                }
                            </td>
                            <td>{idea?.students[0]?.email || 'N/A'}</td>
                            <td>{idea.totalScore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #printable-table, #printable-table * { visibility: visible; }
                    #printable-table { position: absolute; left: 0; top: 0; width: 100%; }
                    .print-btn { display: none; }
                }
            `}</style>
        </div>
    );
};

export default ViewIdeas;