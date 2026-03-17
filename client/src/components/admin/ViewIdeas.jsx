import React from "react";

const ViewIdeas = ({ ideas }) => {

    return (

        <div className="table-container">

            <h3>Saved Ideas</h3>

            <table>

                <thead>

                    <tr>
                        <th>Idea Title</th>
                        <th>Category</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {ideas.map((idea, index) => (
                        <tr key={index}>
                            <td>{idea.title}</td>
                            <td>{idea.domain}</td>
                            <td>{idea.startDate}</td>
                            <td>{idea.endDate}</td>
                            <td>{idea.status}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    );
};

export default ViewIdeas;