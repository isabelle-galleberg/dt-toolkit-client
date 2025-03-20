import { useUserStore } from '../../store/userStore';
import lightBulb from '../../assets/light-bulb.png';

function NavbarTop() {
  const { user, logoutUser } = useUserStore();

  function getInitials(username: string): string {
    if (!username) return '';
    const words = username.trim().split(/\s+/);
    const initials = words.slice(0, 2).map((word) => word[0].toUpperCase());
    return initials.join('');
  }

  return (
    <div className="navbar fixed p-4 z-50 w-full flex justify-between items-center">
      {/* Left: Clickable Image */}
      <div className="navbar-start">
        <a href="/">
          <img src={lightBulb} alt="Logo" className="h-10 w-auto" />
        </a>
      </div>

      {/* Right: Avatar and Menu */}
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="avatar placeholder z-[1] bg-base-100">
              <div className="bg-neutral text-neutral-content w-11 rounded-full border-2 border-white">
                <span>{user && getInitials(user?.username)}</span>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm border bg-base-100 border-white dropdown-content rounded-box z-[1] mt-3 w-23 p-2 shadow"
          >
            <li>
              <button className="text-center" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavbarTop;
