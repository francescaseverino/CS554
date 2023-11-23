import {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import {useSelector} from 'react-redux';

export default function AddCollection() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({name: ''});
    const [used, setUsed] = useState('');
    const allCollections = useSelector((state) => state.collections);

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const addCollection = () =>{
        if(!formData.name.trim()){
            setFormData({name: ''});
            setUsed('Please enter a name');
            return;
        }

        if(allCollections.some((x) => x.name.toLowerCase() === formData.name.toLowerCase())){
            setUsed('Name already exists.');
            return;
        }

        setUsed('');
        dispatch(actions.createCollection(formData.name));
        document.getElementById('name').value = '';
        setFormData({name: ''});
    }
    
    return(
        <div className='flex flex-col justify-between bg-gray-600 p-5'>

            <div className='input-selection'>
                <label>
                Name:
                <input
                    className='text-black'
                    onChange={(e) => handleChange(e)}
                    id='name'
                    name='name'
                    placeholder='Name of collection...'
                />
                </label>
            </div>
            <div className='p-9'>
                {used && (<p>{used}</p>)}
                <button className='btn' onClick={addCollection}>Submit</button>
            </div>

        </div>
    )
}
