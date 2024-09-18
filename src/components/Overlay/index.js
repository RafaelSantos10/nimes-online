import styles from "./Custom.module.css"

function Label({text}) {
  return (
    <div className={styles.divMain}>
      <h2 className="ms-1">{text}</h2>
    </div>
  );
}

export default Label;
