import { createUserService, deleteUsersService, getAllUsersService, getUserByIdService, updateUsersService } from "../models/userModel.js";

const handleResponse = (res,status,message,data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
};

//creating_user function
export const createUser = async (req,res,next) => {
    const {name,email} = req.body;

    try{
        const newUser = await createUserService(name,email);
        handleResponse(res,201,"user created successfully",newUser)
    } catch(err){
        next(err)
    }
}


//get_users function
export const getAllUser = async (req,res,next) => {
    //const {name,email} = req.body;

    try{
        const users = await getAllUsersService();
        handleResponse(res,201,"users fetched successfully",users)
    } catch(err){
        next(err)
    }
}

//get users by id
export const getUserById = async (req,res,next) => {
    try{
        const user = await getUserByIdService(req.params.id);
        if(!user) return handleResponse(res,404,"user not found")
        handleResponse(res,201,"user fetched successfully",user )
    } catch(err){
        next(err)
    }
}

//update user by id  

export const updateUser = async (req,res,next) => {
    const {name,email} = req.body;
    try{
        const user = await updateUsersService(req.params.id,name,email);
        if(!user) return handleResponse(res,404,"user not found")
        handleResponse(res,201,"user updated successfully",user )
    } catch(err){
        next(err)
    }
}

//delete user by id 
export const deleteUser = async (req,res,next) => {
    try{
        const user = await deleteUsersService(req.params.id);
        if(!user) return handleResponse(res,404,"user not found")
        handleResponse(res,201,"user updated successfully",user )
    } catch(err){
        next(err)
    }
}