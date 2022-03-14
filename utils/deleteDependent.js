/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Event = require('../model/Event');
let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteEvent = async (filter) =>{
  try {
    return await Event.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

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
      const EventFilter8229 = { 'updatedBy': { '$in': user } };
      const Event3159 = await deleteEvent(EventFilter8229);
      const EventFilter6530 = { 'addedBy': { '$in': user } };
      const Event1698 = await deleteEvent(EventFilter6530);
      const BlogFilter8964 = { 'updatedBy': { '$in': user } };
      const Blog1851 = await deleteBlog(BlogFilter8964);
      const BlogFilter2782 = { 'addedBy': { '$in': user } };
      const Blog3923 = await deleteBlog(BlogFilter2782);
      const userFilter1760 = { 'addedBy': { '$in': user } };
      const user3015 = await deleteUser(userFilter1760);
      const userFilter4691 = { 'updatedBy': { '$in': user } };
      const user2924 = await deleteUser(userFilter4691);
      const userTokensFilter4832 = { 'userId': { '$in': user } };
      const userTokens2330 = await deleteUserTokens(userTokensFilter4832);
      const userTokensFilter9763 = { 'addedBy': { '$in': user } };
      const userTokens2273 = await deleteUserTokens(userTokensFilter9763);
      const userTokensFilter6897 = { 'updatedBy': { '$in': user } };
      const userTokens0744 = await deleteUserTokens(userTokensFilter6897);
      const roleFilter8026 = { 'addedBy': { '$in': user } };
      const role3699 = await deleteRole(roleFilter8026);
      const roleFilter1485 = { 'updatedBy': { '$in': user } };
      const role7763 = await deleteRole(roleFilter1485);
      const projectRouteFilter4376 = { 'addedBy': { '$in': user } };
      const projectRoute4907 = await deleteProjectRoute(projectRouteFilter4376);
      const projectRouteFilter0956 = { 'updatedBy': { '$in': user } };
      const projectRoute7289 = await deleteProjectRoute(projectRouteFilter0956);
      const routeRoleFilter7964 = { 'addedBy': { '$in': user } };
      const routeRole3358 = await deleteRouteRole(routeRoleFilter7964);
      const routeRoleFilter6981 = { 'updatedBy': { '$in': user } };
      const routeRole1158 = await deleteRouteRole(routeRoleFilter6981);
      const userRoleFilter9178 = { 'userId': { '$in': user } };
      const userRole9224 = await deleteUserRole(userRoleFilter9178);
      const userRoleFilter3967 = { 'addedBy': { '$in': user } };
      const userRole0797 = await deleteUserRole(userRoleFilter3967);
      const userRoleFilter3325 = { 'updatedBy': { '$in': user } };
      const userRole2742 = await deleteUserRole(userRoleFilter3325);
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
      const routeRoleFilter3562 = { 'roleId': { '$in': role } };
      const routeRole8594 = await deleteRouteRole(routeRoleFilter3562);
      const userRoleFilter7821 = { 'roleId': { '$in': role } };
      const userRole6943 = await deleteUserRole(userRoleFilter7821);
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
      const routeRoleFilter7481 = { 'routeId': { '$in': projectroute } };
      const routeRole7712 = await deleteRouteRole(routeRoleFilter7481);
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

const countEvent = async (filter) =>{
  try {
        
    const EventCnt =  await Event.countDocuments(filter);
    return { Event : EventCnt };
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

      const EventFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const EventCnt =  await dbService.countDocument(Event,EventFilter);

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
        Event : EventCnt,
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

const softDeleteEvent = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Event.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
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
      const EventFilter3421 = { 'updatedBy': { '$in': user } };
      const Event2100 = await softDeleteEvent(EventFilter3421, updateBody);
      const EventFilter3303 = { 'addedBy': { '$in': user } };
      const Event0396 = await softDeleteEvent(EventFilter3303, updateBody);
      const BlogFilter2532 = { 'updatedBy': { '$in': user } };
      const Blog9818 = await softDeleteBlog(BlogFilter2532, updateBody);
      const BlogFilter1245 = { 'addedBy': { '$in': user } };
      const Blog4968 = await softDeleteBlog(BlogFilter1245, updateBody);
      const userFilter5787 = { 'addedBy': { '$in': user } };
      const user2547 = await softDeleteUser(userFilter5787, updateBody);
      const userFilter8274 = { 'updatedBy': { '$in': user } };
      const user6778 = await softDeleteUser(userFilter8274, updateBody);
      const userTokensFilter2692 = { 'userId': { '$in': user } };
      const userTokens6255 = await softDeleteUserTokens(userTokensFilter2692, updateBody);
      const userTokensFilter4776 = { 'addedBy': { '$in': user } };
      const userTokens3744 = await softDeleteUserTokens(userTokensFilter4776, updateBody);
      const userTokensFilter3079 = { 'updatedBy': { '$in': user } };
      const userTokens5999 = await softDeleteUserTokens(userTokensFilter3079, updateBody);
      const roleFilter6662 = { 'addedBy': { '$in': user } };
      const role9681 = await softDeleteRole(roleFilter6662, updateBody);
      const roleFilter3700 = { 'updatedBy': { '$in': user } };
      const role1247 = await softDeleteRole(roleFilter3700, updateBody);
      const projectRouteFilter8052 = { 'addedBy': { '$in': user } };
      const projectRoute9680 = await softDeleteProjectRoute(projectRouteFilter8052, updateBody);
      const projectRouteFilter1098 = { 'updatedBy': { '$in': user } };
      const projectRoute2772 = await softDeleteProjectRoute(projectRouteFilter1098, updateBody);
      const routeRoleFilter1558 = { 'addedBy': { '$in': user } };
      const routeRole8723 = await softDeleteRouteRole(routeRoleFilter1558, updateBody);
      const routeRoleFilter1524 = { 'updatedBy': { '$in': user } };
      const routeRole1995 = await softDeleteRouteRole(routeRoleFilter1524, updateBody);
      const userRoleFilter9120 = { 'userId': { '$in': user } };
      const userRole5777 = await softDeleteUserRole(userRoleFilter9120, updateBody);
      const userRoleFilter7061 = { 'addedBy': { '$in': user } };
      const userRole3674 = await softDeleteUserRole(userRoleFilter7061, updateBody);
      const userRoleFilter9826 = { 'updatedBy': { '$in': user } };
      const userRole4842 = await softDeleteUserRole(userRoleFilter9826, updateBody);
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
      const routeRoleFilter8353 = { 'roleId': { '$in': role } };
      const routeRole2828 = await softDeleteRouteRole(routeRoleFilter8353, updateBody);
      const userRoleFilter3822 = { 'roleId': { '$in': role } };
      const userRole9894 = await softDeleteUserRole(userRoleFilter3822, updateBody);
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
      const routeRoleFilter4548 = { 'routeId': { '$in': projectroute } };
      const routeRole5723 = await softDeleteRouteRole(routeRoleFilter4548, updateBody);
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
  deleteEvent,
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countEvent,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteEvent,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
