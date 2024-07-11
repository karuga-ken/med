{activeSection === 'summary' ? (
    <div className='flex flex-wrap gap-10 w-full justify-center max-h-full mt-5 '>
         <div className='bg-white w-1/3 p-2 rounded-md shadow-md' style={{height:'300px'}}>
                    <div className='font-semibold'>
                        <h1>Medical Allergies</h1>
                    </div>
                    <div className='p-4 flex flex-wrap'>
                        <h1 className='w-full mb-5'>Peanut Allergy</h1>
                        <h1 className='w-full mb-5'>Penicillin allergy</h1>
                        <h1 className='w-full mb-5'>Lactose Intolerant</h1>
                    </div>
                </div>

                <div className='bg-white w-1/3 p-2 shadow-md rounded-md' style={{height:'300px'}}>
                    <div className='font-semibold'>
                            <h1>Medical Conditions</h1>
                    </div>

                    <div className='p-4 flex flex-wrap'>
                        <h1 className='w-full mb-5'>Asthma</h1>
                        <h1 className='w-full mb-5'>Type 2 Diabetes</h1>
                        <h1 className='w-full mb-5'>Hypertension-High Blood Pressure</h1>
                    </div>
                </div>

                <div className='bg-white w-1/3 p-2 shadow-md rounded-md' style={{height:'300px'}}>
                    <div className='font-semibold'>
                            <h1>Medications/Prescriptions</h1>
                    </div>
                    <div className='p-4 flex flex-wrap'>
                        <h1 className='w-full mb-5'>Paracetamol (2 * 3)</h1>
                        <h1 className='w-full mb-5'>Flu-gone (1tbsp * 3)</h1>
                        <h1 className='w-full mb-5'>Zyrtal Mr (1 * 2)</h1>
                    </div>
                    </div>

                <div className='bg-white w-1/3 p-2 shadow-md rounded-md' style={{height:'300px'}}>
                    <div className='font-semibold'>
                            <h1>Surgeries and Procedures</h1>
                    </div>

                    <div className='p-4 flex flex-wrap'>
                        <h1 className='w-full mb-5'>Colonoscopy (23-06-2023)</h1>
                        <h1 className='w-full mb-5'>Appendectomy (12-1-2024)</h1>
                    </div>
                </div>
    </div>
) : (
    <MedicalRecords />
)}