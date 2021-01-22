import * as axios from 'axios';
import auth from '../auth/auth';
import { ActionCreators } from '../redux/userReducer'

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44374/'
})

export const login = async (user, props) =>
{
    try{
        await axiosInstance.post('User/Login',
        {
            'username': user.email,
            'password': user.password
        },{'Content-Type':'application/json; charset=utf-8', 'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*'})
        .then((response) => 
        {
            if(response.data.length !== 0)
            {
                user.login = true; 
                auth.login(() => { props.history.push('/home') })
                localStorage.setItem('username', response.data[0].username);
            }
            else
            {
                var incorrect = document.getElementById('overlay7');
                incorrect.innerHTML = 'Email or password is incorrect...';
                incorrect.style.color='red';
                user.login = false;
                localStorage.clear();
            }
        })
    }
    catch(e)
    {
        console.log("Error 404.")
    }
}

export const NewUser = async (dispatch, client) => 
{
    try
    {
        await axiosInstance.post('User/Create', client);
        alert('User succesfully registered...');

    }
    catch
    {
        console.log('Error in creating a user...')
    }
}

export const GetUsers = async (dispatch) => 
{  
    try
    {
        const {data} = await axiosInstance.get('User');
        dispatch(ActionCreators.setUsers(data));
    }
    catch
    {
        console.log('Error in geting users...');
    }
}

export const AddFriend = async (dispatch, client) => 
{  
    try
    {
        var loggedin = localStorage.getItem('username');
        await axiosInstance.post('User/Connect/'+`${loggedin}`, client );
    }
    catch
    {
        console.log('Error in adding friend...');
    }
}

export const GetFriends = async (dispatch) =>
{
    try
    {
        var loggedin = localStorage.getItem('username');
        const {data} = await axiosInstance.get('User/'+`${loggedin}`);
        dispatch(ActionCreators.setUsers(data));
    }
    catch
    {
        console.log('Error in geting friends...');
    }
}

export const GetAllUsers = async (dispatch) =>
{
    try
    {
        var loggedin = localStorage.getItem('username');
        const {data} = await axiosInstance.get('User/Get/'+`${loggedin}`);
        dispatch(ActionCreators.setUsers(data));
    }
    catch
    {
        console.log('Error in geting friends...');
    }
}

