import "./Logout.scss";
export default function LogOut({ onClick }) {
  return (
    <button className="button-logout" onClick={onClick}>
      <svg
        width="17"
        height="23"
        viewBox="0 0 17 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.84063 12.4656H9.55313C10.0031 12.4656 10.3781 12.0906 10.3781 11.6406C10.3781 11.1906 10.0031 10.8156 9.55313 10.8156H2.87813L5.20312 8.45313C5.54062 8.11563 5.54062 7.59062 5.20312 7.25312C4.86563 6.91562 4.34063 6.91562 4.00313 7.25312L0.253125 11.0781C-0.084375 11.4156 -0.084375 11.9406 0.253125 12.2781L4.00313 16.1031C4.15313 16.2531 4.37812 16.3656 4.60312 16.3656C4.82812 16.3656 5.01562 16.2906 5.20312 16.1406C5.54062 15.8031 5.54062 15.2781 5.20312 14.9406L2.84063 12.4656Z" />
        <path d="M13.0375 0H8.8C7.825 0 7 0.825 7 1.8V4.3875C7 4.8375 7.375 5.2125 7.825 5.2125C8.275 5.2125 8.6875 4.8375 8.6875 4.3875V1.7625C8.6875 1.6875 8.725 1.65 8.8 1.65H13.0375C13.9375 1.65 14.65 2.3625 14.65 3.2625V19.35C14.65 20.25 13.9375 20.9625 13.0375 20.9625H8.8C8.725 20.9625 8.6875 20.925 8.6875 20.85V18.2625C8.6875 17.8125 8.3125 17.4375 7.825 17.4375C7.3375 17.4375 7 17.8125 7 18.2625V20.85C7 21.825 7.825 22.65 8.8 22.65H13.0375C14.875 22.65 16.3375 21.15 16.3375 19.35V3.3C16.3375 1.4625 14.8375 0 13.0375 0Z" />
      </svg>
      Log Out
    </button>
  );
}
