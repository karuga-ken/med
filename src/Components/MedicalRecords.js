import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalRecords = ({ selectedPatient }) => {
    const [showModal, setShowModal] = useState(false);
    const [patientRecords, setPatientRecords] = useState({
        Hospital: '',
        PatientName: '',
        DrName: '',
        Date: '',
    });
    const [file, setFile] = useState(null);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        if (selectedPatient) {
            fetchRecords();
            setPatientRecords(prevState => ({
                ...prevState,
                PatientName: selectedPatient.name
            }));
        }
    }, [selectedPatient]);

    const fetchRecords = async () => {
        if (!selectedPatient) return;
        try {
            const response = await axios.get(`http://127.0.0.1:4040/records/${selectedPatient.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const handleChange = (e) => {
        setPatientRecords({ ...patientRecords, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPatient) {
            console.error('No patient selected');
            return;
        }

        const formData = new FormData();
        formData.append('Hospital', patientRecords.Hospital);
        formData.append('PatientName', selectedPatient.name);
        formData.append('DrName', patientRecords.DrName);
        formData.append('Date', patientRecords.Date);
        formData.append('PatientID', selectedPatient.id);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await axios.post('http://127.0.0.1:4040/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            console.log(response.data);
            setShowModal(false);
            fetchRecords();  // Refresh the list of records
        } catch (error) {
            console.error('Error adding medical record:', error);
        }
    };

    const downloadMedicalRecord = async (recordId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:4040/api/medical-records/${recordId}/download`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `medical_record_${recordId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading medical record:', error);
        }
    };

    if (!selectedPatient) {
        return <div>Please select a patient</div>;
    }

    return (
        <div className='justify-center flex w-full'>
            <div className='flex flex-col justify-center w-4/5 mt-5'>
                <div className='flex justify-center mb-5'>
                    <button className='bg-oxford-blue hover:bg-mikado-yellow text-white p-2 rounded-md font-semibold' onClick={() => setShowModal(true)}>Add Diagnosis Report</button>
                </div>
                {records.map((record) => (
                    <div key={record.id} className='bg-white flex justify-center gap-10 mb-5 p-5 rounded-md shadow-md font-semibold'>
                        <h1 className='mr-5 ml-5 pt-2 pb-2'>{record.hospital_name}</h1>
                        <h1 className='mr-5 ml-5 pt-2 pb-2'>{record.patient_name}</h1>
                        <h1 className='mr-5 ml-5 pt-2 pb-2'>Dr. {record.doctor_name}</h1>
                        <h1 className='mr-5 ml-5 pt-2 pb-2'>Date: {record.date}</h1>
                        <button className='bg-oxford-blue hover:bg-mikado-yellow cursor-pointer text-white p-2 rounded-md'
                            onClick={() => downloadMedicalRecord(record.id)}
                        >Download Record</button>
                    </div>
                ))}
            </div>
      

       {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-xl w-1/2">
                        <h2 className="text-xl mb-4 font-bold">Add Medical Diagnosis/Report</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Hospital">
                                    Hospital Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Hospital"
                                    name="Hospital"
                                    value={patientRecords.Hospital}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PatientName">
                                    Patient Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="PatientName"
                                    name="PatientName"
                                    value={patientRecords.PatientName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DrName">
                                    Doctor's Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="DrName"
                                    name="DrName"
                                    value={patientRecords.DrName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Date">
                                    Date
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Date"
                                    type='date'
                                    name="Date"
                                    value={patientRecords.Date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                                    Upload Medical Report
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="file"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,"
                                    required
                                />
                                {file && <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>}
                            </div>
                            
                           
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
    </div>
       
  )
}

export default MedicalRecords