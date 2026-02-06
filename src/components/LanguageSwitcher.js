import swal from "sweetalert";

const LanguageSwitcher = () => {
  const changeLanguage = (langCode) => {
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = langCode;
      selectField.dispatchEvent(new Event("change"));
    }
  };

  const reloud = () => {
    swal({
      title: "change the language?",
      text: "if the language didnt changed reload the page and try again",
      // icon: "warning",
      // buttons: true,
      // dangerMode: true,
      // }).then((willDelete) => {
      //   if (willDelete) {
      //     window.location.reload();
      //     window.location.replace(window.location.href);
      //   }
    });
    // setTimeout(() => {

    // }, 1000);
  };
  return (
    <div className="p-2" onClick={reloud}>
      <button
        className="btn btn-success btn-sm d-block mb-2"
        onClick={() => changeLanguage("ar")}
      >
        arabic
      </button>
      <button
        className="btn btn-success btn-sm d-block mb-2"
        onClick={() => changeLanguage("en")}
      >
        English
      </button>
      <button
        className="btn btn-success btn-sm d-block"
        onClick={() => changeLanguage("fr")}
      >
        frunch
      </button>
    </div>
  );
};

export default LanguageSwitcher;
