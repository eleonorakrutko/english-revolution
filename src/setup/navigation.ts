import { OutgoingCooperations, SchoolCooperation, StudentCooperation, TeacherDetails } from './../pages';
import { MdEvent, MdPersonAdd, MdLayers, MdFormatListBulleted, MdPeople, MdPeopleOutline, MdAccountCircle, MdContactMail } from '../components/icons';
import { AssignTeacherToStudents, TeachersList, ActiveHomeworks, GroupDetails, GroupList, StudentList, Schedule, Profile } from '../pages';
import { RolesEnum } from './../types/roles-enum';
import { IconType } from 'react-icons';
import { TeacherCooperation } from '../pages/teacher';


export interface INavigationItem {
    path: string,
    page: React.FC,
    roleType: RolesEnum,
    title: string,
    shouldShowInNav: boolean,
    customIcon?: IconType | undefined,
  }
  
export const getPagesByRole = (roleType: RolesEnum | null) => {
    const filteredNavSetup = navigationSetup.filter(item => roleType === item.roleType)
    return filteredNavSetup.map(({page, path}) => ({page, path}))
}
  
export const getNavItemsByRole = (roleType: RolesEnum) => {
    const filteredNavSetup = navigationSetup.filter(item => roleType === item.roleType && item.shouldShowInNav)
    return filteredNavSetup.map(({path, title, customIcon}) => ({path, title, customIcon}))
}
  
const navigationSetup: INavigationItem[] = [
    {path: '/profile', page: Profile, roleType: RolesEnum.STUDENT, title: 'Profile', shouldShowInNav: true, customIcon: MdAccountCircle},
    {path: '/profile', page: Profile, roleType: RolesEnum.TEACHER, title: 'Profile', shouldShowInNav: true, customIcon: MdAccountCircle},
    {path: '/profile', page: Profile, roleType: RolesEnum.SCHOOL_SUPER_ADMIN, title: 'Profile', shouldShowInNav: true, customIcon: MdAccountCircle},
    
    {path: '/schedule', page: Schedule, roleType: RolesEnum.TEACHER, title: 'Schedule', shouldShowInNav: true, customIcon: MdEvent},
    {path: '/schedule', page: Schedule, roleType: RolesEnum.STUDENT, title: 'Schedule', shouldShowInNav: true, customIcon: MdEvent},

    {path: '/cooperation', page: StudentCooperation, roleType: RolesEnum.STUDENT, title: 'Cooperation', shouldShowInNav: true, customIcon: MdContactMail},
    {path: '/cooperation', page: TeacherCooperation, roleType: RolesEnum.TEACHER, title: 'Cooperation', shouldShowInNav: true, customIcon: MdContactMail},
    {path: '/cooperation', page: SchoolCooperation, roleType: RolesEnum.SCHOOL_SUPER_ADMIN, title: 'Cooperation', shouldShowInNav: true, customIcon: MdContactMail},

    
    {path: '/student-list', page: StudentList, roleType: RolesEnum.TEACHER, title: 'Students', shouldShowInNav: true, customIcon: MdPeopleOutline},
    {path: '/student-list', page: StudentList, roleType: RolesEnum.SCHOOL_SUPER_ADMIN, title: 'Students', shouldShowInNav: true, customIcon: MdPeopleOutline},

    {path: '/group-list', page: GroupList, roleType: RolesEnum.TEACHER, title: 'Groups', shouldShowInNav: true, customIcon: MdFormatListBulleted},
    {path: '/group-list', page: GroupList, roleType: RolesEnum.SCHOOL_SUPER_ADMIN, title: 'Groups', shouldShowInNav: true, customIcon: MdFormatListBulleted},

    {path: '/group-details/:id', page: GroupDetails, roleType: RolesEnum.TEACHER, title: 'Group details', shouldShowInNav: false},
    {path: '/group-details/:id', page: GroupDetails, roleType: RolesEnum.SCHOOL_SUPER_ADMIN, title: 'Group details', shouldShowInNav: false},
   
    {path: '/teachers-list', page: TeachersList, roleType: RolesEnum.SCHOOL_SUPER_ADMIN, title: 'Teachers', shouldShowInNav: true, customIcon: MdPeople},
    
    {path: '/assign-teacher-to-students', page: AssignTeacherToStudents, roleType: RolesEnum.SCHOOL_SUPER_ADMIN, title: 'Assign teacher', shouldShowInNav: true, customIcon: MdPersonAdd},

    {path: '/outgoing-cooperations', page: OutgoingCooperations, roleType: RolesEnum.SCHOOL_SUPER_ADMIN, title: 'Outgoing cooperations', shouldShowInNav: false},

    {path: '/teacher-details/:id', page: TeacherDetails, roleType: RolesEnum.SCHOOL_SUPER_ADMIN, title: 'Teacher details', shouldShowInNav: false},
]