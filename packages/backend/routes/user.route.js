import express from 'express';
import {createUser, updateUser, updateUserImage, updateUserPassword} from '../controllers/user.controller.js';
import {handleImageUpload} from "../middlewares/uploadImage.middleware.js";

const Router = express.Router();

Router.post('/', async (req, res, next) => { // for test until we have register
  const userData = req.body;
  try {
    const user = await createUser(userData);
    res.status(201).json({status: 'success', data: user});
  } catch (err) {
    next(err);
  }
});

Router.patch('/:id', async (req, res, next)=>{
  const [id, userData] = [req.params.id, req.body];
  try {
    const updatedUser = await updateUser(id, userData);
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({status: 'success', data: updatedUser});
  } catch (err) {
    next(err);
  }
});

Router.patch('/:id/password', async (req, res, next)=>{
  const [id, userData] = [req.params.id, req.body];
  try {
    const updatedUser = await updateUserPassword(id, userData);
    res.status(200).json({status: 'success', data: updatedUser});
  } catch (err) {
    next(err);
  }
});

Router.patch('/:id/image', handleImageUpload('user'), async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await updateUserImage(id, req.file.path);
    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    next(err);
  }
});

export default Router;
