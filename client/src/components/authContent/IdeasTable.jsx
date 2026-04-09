import React from "react";

const IdeasTable = ({ ideas }) => {
    return (
        <div id="ideas-section" className="bg-white p-5 rounded-xl shadow mt-6">
            <h2 className="text-xl font-semibold mb-3">Dropped Ideas</h2>

            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Problem</th>
                            <th className="p-2">Idea</th>
                            <th className="p-2">System Marks</th>
                            <th className="p-2">Manual Marks (Avg)</th>
                            <th className="p-2">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ideas.map((idea) => {
                            var totalManual = 0;

                            for(var i=0; i<idea.manualMarks.length; i++){
                                totalManual += idea.manualMarks[i];
                            }

                            return (
                                <tr key={idea._id} className="text-center border-t">
                                    <td className="p-2">
                                        {idea.problemId?.title || "-"}
                                    </td>

                                    <td className="p-2">{idea.title}</td>

                                    <td className="p-2">
                                        {idea.autoPoints || 0}
                                    </td>

                                    <td className="p-2">
                                        {totalManual}
                                    </td>

                                    <td className="p-2 font-bold">
                                        {idea.totalScore || 0}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IdeasTable;