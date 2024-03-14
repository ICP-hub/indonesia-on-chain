import { Link } from "react-router-dom";
import Data from "../../../assets/users.json";

const EducatorCertificates = () => {
    const renderTH = (th) => <th className="py-2 px-4 font-medium">{th}</th>;
    const renderTD = (td) => <td className="py-4 px-4">{td}</td>;
    return (
        <div className="w-full px-14">
            <div className="w-full p-3 bg-white rounded-md">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            {renderTH("Name")}
                            {renderTH("Email")}
                            {renderTH("Start Date")}
                            {renderTH("End Date")}
                            {renderTH("Educator Name")}
                            {renderTH("Action")}

                        </tr>
                    </thead>
                    <tbody>
                        {Data.map((item, index) => {
                            return (
                                <tr key={index} className="bg-white border-b">
                                    {renderTD(item.studentName)}
                                    {renderTD(item.email)}
                                    {renderTD(item.startDate)}
                                    {renderTD(item.endDate)}
                                    {renderTD(item.educatorName)}

                                    <td className="py-2 px-4">
                                        <Link to={`generate-certificates?id=${item.user_id}`} state={item} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">View</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default EducatorCertificates;
