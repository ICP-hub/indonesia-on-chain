import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './../../Components/utils/useAuthClient';
import Loader from './../../Components/Loader/Loader';

const CertificateShowcase = () => {
    const { id } = useParams();
    const { actor, contentActor } = useAuth();
    const [certificateData, setCertificateData] = useState("");
    const [loading, setLoading] = useState(false);

    const getCertificateData = async (certificateId) => {
        try {
            const certData = await contentActor.getcertificate(certificateId);
            return certData.Ok[0]?.key_val_data[3]?.val?.TextContent || "";
        } catch (error) {
            console.error("Error fetching certificate data:", error);
            return "";
        }
    };
    

    useEffect(() => {
        const fetchCertificateData = async () => {
            setLoading(true)
            const data = await getCertificateData(id);
            setCertificateData(data);
            setLoading(false)
        };

        fetchCertificateData();
    }, [id]);

  return (
    loading ? (
        <Loader />
      ) : (
    <div className='flex items-center justify-center h-screen'>
        <img src={certificateData} alt='image certificate' className='w-4/5' />
    </div>)
  )
}

export default CertificateShowcase