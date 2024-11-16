import styles from "../style";
import UploadButton from "./UploadButton";

const Upload = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Upload Your Files Now !</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
       Upload for free and with total anonymously your files with DiscreetShare.
      </p>
      <div className={`mt-10`}>
      <UploadButton />
    </div>
    </div>

    
  </section>
);

export default Upload;
