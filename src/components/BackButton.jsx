import { useNavigate } from 'react-router-dom';

export const BackButton = ({route}) => {

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(route);
    }

    return (
        <div className='back-container'>
            <button className="btn btn-warning btn-lg" onClick={handleReturn}><i className="fa fa-arrow-left" aria-hidden="true"></i> Regresar</button>
        </div>
    )
}
