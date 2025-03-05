import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';
const router = Router();

// User routes
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Friend routes
router.route('/:userId/friends/:friendId')
  .post(addFriend)    
  .delete(removeFriend); 


export default router;