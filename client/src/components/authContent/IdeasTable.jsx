import React from "react";

const IdeasTable = ({ ideas }) => {

    // calculate average manual marks safely
    const getManualAvg = (marks = []) => {
        if (!marks || marks.length === 0) return 0;
        const total = marks.reduce((sum, m) => sum + m, 0);
        return (total / marks.length).toFixed(1);
    };

    return (
        <div className="ideas-wrapper">

            <div className="ideas-card">

                <h2 className="ideas-title">Dropped Ideas</h2>

                <div className="table-responsive">

                    <table className="ideas-table">

                        <thead>
                            <tr>
                                <th>Problem</th>
                                <th>Idea</th>
                                <th>System Marks</th>
                                <th>Manual Marks (Avg)</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ideas && ideas.length > 0 ? (
                                ideas.map((idea, index) => {

                                    const manualAvg = getManualAvg(idea.manualMarks);
                                    const total = (idea.systemMarks || 0) + parseFloat(manualAvg);

                                    return (
                                        <tr key={index}>
                                            <td>{idea.problemTitle || "-"}</td>
                                            <td>{idea.title || "-"}</td>
                                            <td>{idea.systemMarks || 0}</td>
                                            <td>{manualAvg}</td>
                                            <td className="total">{total}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="empty">
                                        No ideas found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default IdeasTable;