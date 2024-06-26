import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
const { signOut } = await import("auth-astro/client");
import { jwtDecode } from "jwt-decode";
import { getVolunteersByID } from "../../../helpers/SocioVoluntario/getUserSocioVoluntarioByID";


let idDecodificado = "";
const tokenUser = Cookies.get("token") ? Cookies.get("token") : "";
console.log(tokenUser);
interface MenuProps {
  children: React.ReactNode;
}

const MenuUser: React.FC<MenuProps> = ({ children }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [infoUser, setInfoUser] = useState<any>(null);

const userRoles = infoUser?.role.map((role:any) => role.role) || [];
const isVolunteer = userRoles.includes('Volunteer');
const isPartner = userRoles.includes('Partner');
console.log(userRoles);
let href = '';
let buttonText = '';

if (isVolunteer && isPartner) {
  href = '';
  buttonText = '';
} else if (isVolunteer) {
  href = '/dashboardUser/profile/optionSelected/socio';
  buttonText = 'Hacete Socio';
} else if (isPartner) {
  href = '/dashboardUser/profile/optionSelected/voluntario';
  buttonText = 'Hacete Voluntario';
}
  


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  if (tokenUser) {
    try {
      const decodedToken: any = jwtDecode(tokenUser);
      idDecodificado = decodedToken.userPayload.sub;
      console.log(decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    if (idDecodificado) {
      getVolunteersByID(idDecodificado)
        .then((data) => {
          setInfoUser(data);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idDecodificado]);

  return (
    <div className="relative">
      <button className="flex items-center" onClick={toggleDropdown}>
        {children}
      </button>
      <ul
        className={`absolute mt-8 right-[-40px] w-80 bg-white shadow-lg z-50 rounded-lg ${
          dropdownVisible ? "block" : "hidden"
        }`}
      >
        <li className="">
          <a href={infoUser?.role[0]?.role ? "/dashboardUserVolunteer/profile" : "/dashboardUser/profile"} className="flex flex-col px-4 p-2 bg-secondary rounded-t-lg hover:bg-gray-100 hover:rounded-lg">
            <h4 className="text-sm font-medium text-textSecondary">Menú de Usuario</h4>
            <p className="text-sm font-base text-textSecondary">Aquí encontrarás diversas opciones que podrás investigar</p>
          </a>
        </li>
        {buttonText && (
          <li className="">
            <a href={href} className="flex flex-col px-4 p-2 rounded-t-lg hover:bg-gray-100 hover:rounded-lg">
              <h4 className="text-sm font-medium text-textSecondary">{buttonText}</h4>
            </a>
          </li>
        )}
        <li className="text-2xl p-4 hover:bg-gray-100 hover:rounded-b-lg">
          <button onClick={() => {
            signOut();
            Cookies.remove("token");
            Cookies.remove("fullName");
          }} className="text-textTertiary text-sm font-medium">Cerrar sesión</button>
        </li>
      </ul>
    </div>
  );
};

export default MenuUser;
