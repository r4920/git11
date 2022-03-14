/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter1643 = { 'updatedBy': { '$in': user } };
      const Blog5834 = await deleteBlog(BlogFilter1643);
      const BlogFilter4594 = { 'addedBy': { '$in': user } };
      const Blog6663 = await deleteBlog(BlogFilter4594);
      const userFilter9473 = { 'addedBy': { '$in': user } };
      const user5330 = await deleteUser(userFilter9473);
      const userFilter2017 = { 'updatedBy': { '$in': user } };
      const user1489 = await deleteUser(userFilter2017);
      const userTokensFilter6513 = { 'userId': { '$in': user } };
      const userTokens5679 = await deleteUserTokens(userTokensFilter6513);
      const userTokensFilter7780 = { 'addedBy': { '$in': user } };
      const userTokens7125 = await deleteUserTokens(userTokensFilter7780);
      const userTokensFilter2719 = { 'updatedBy': { '$in': user } };
      const userTokens8086 = await deleteUserTokens(userTokensFilter2719);
      const roleFilter4630 = { 'addedBy': { '$in': user } };
      const role9645 = await deleteRole(roleFilter4630);
      const roleFilter2784 = { 'updatedBy': { '$in': user } };
      const role7398 = await deleteRole(roleFilter2784);
      const projectRouteFilter5963 = { 'addedBy': { '$in': user } };
      const projectRoute9181 = await deleteProjectRoute(projectRouteFilter5963);
      const projectRouteFilter7653 = { 'updatedBy': { '$in': user } };
      const projectRoute3525 = await deleteProjectRoute(projectRouteFilter7653);
      const routeRoleFilter1626 = { 'addedBy': { '$in': user } };
      const routeRole6217 = await deleteRouteRole(routeRoleFilter1626);
      const routeRoleFilter7725 = { 'updatedBy': { '$in': user } };
      const routeRole2595 = await deleteRouteRole(routeRoleFilter7725);
      const userRoleFilter0760 = { 'userId': { '$in': user } };
      const userRole4133 = await deleteUserRole(userRoleFilter0760);
      const userRoleFilter8418 = { 'addedBy': { '$in': user } };
      const userRole6856 = await deleteUserRole(userRoleFilter8418);
      const userRoleFilter7404 = { 'updatedBy': { '$in': user } };
      const userRole3224 = await deleteUserRole(userRoleFilter7404);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter7823 = { 'roleId': { '$in': role } };
      const routeRole2518 = await deleteRouteRole(routeRoleFilter7823);
      const userRoleFilter0689 = { 'roleId': { '$in': role } };
      const userRole5749 = await deleteUserRole(userRoleFilter0689);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter5619 = { 'routeId': { '$in': projectroute } };
      const routeRole8633 = await deleteRouteRole(routeRoleFilter5619);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter4929 = { 'updatedBy': { '$in': user } };
      const Blog6860 = await softDeleteBlog(BlogFilter4929, updateBody);
      const BlogFilter0166 = { 'addedBy': { '$in': user } };
      const Blog3685 = await softDeleteBlog(BlogFilter0166, updateBody);
      const userFilter3228 = { 'addedBy': { '$in': user } };
      const user8082 = await softDeleteUser(userFilter3228, updateBody);
      const userFilter5508 = { 'updatedBy': { '$in': user } };
      const user9597 = await softDeleteUser(userFilter5508, updateBody);
      const userTokensFilter7794 = { 'userId': { '$in': user } };
      const userTokens3337 = await softDeleteUserTokens(userTokensFilter7794, updateBody);
      const userTokensFilter4288 = { 'addedBy': { '$in': user } };
      const userTokens4835 = await softDeleteUserTokens(userTokensFilter4288, updateBody);
      const userTokensFilter7744 = { 'updatedBy': { '$in': user } };
      const userTokens1301 = await softDeleteUserTokens(userTokensFilter7744, updateBody);
      const roleFilter8366 = { 'addedBy': { '$in': user } };
      const role4369 = await softDeleteRole(roleFilter8366, updateBody);
      const roleFilter1053 = { 'updatedBy': { '$in': user } };
      const role3357 = await softDeleteRole(roleFilter1053, updateBody);
      const projectRouteFilter3683 = { 'addedBy': { '$in': user } };
      const projectRoute7462 = await softDeleteProjectRoute(projectRouteFilter3683, updateBody);
      const projectRouteFilter2706 = { 'updatedBy': { '$in': user } };
      const projectRoute5839 = await softDeleteProjectRoute(projectRouteFilter2706, updateBody);
      const routeRoleFilter3656 = { 'addedBy': { '$in': user } };
      const routeRole9819 = await softDeleteRouteRole(routeRoleFilter3656, updateBody);
      const routeRoleFilter9642 = { 'updatedBy': { '$in': user } };
      const routeRole2110 = await softDeleteRouteRole(routeRoleFilter9642, updateBody);
      const userRoleFilter4734 = { 'userId': { '$in': user } };
      const userRole7235 = await softDeleteUserRole(userRoleFilter4734, updateBody);
      const userRoleFilter8084 = { 'addedBy': { '$in': user } };
      const userRole7990 = await softDeleteUserRole(userRoleFilter8084, updateBody);
      const userRoleFilter0571 = { 'updatedBy': { '$in': user } };
      const userRole9990 = await softDeleteUserRole(userRoleFilter0571, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter8414 = { 'roleId': { '$in': role } };
      const routeRole3851 = await softDeleteRouteRole(routeRoleFilter8414, updateBody);
      const userRoleFilter5887 = { 'roleId': { '$in': role } };
      const userRole3498 = await softDeleteUserRole(userRoleFilter5887, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter0707 = { 'routeId': { '$in': projectroute } };
      const routeRole2288 = await softDeleteRouteRole(routeRoleFilter0707, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
