import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTimesCircle } from 'react-icons/fa';
import styles from '@/styles/products/TableInfo.module.css';

const TableInfo = () => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>Plans Details</th>
          <th>Screen Damage</th>
          <th>ADLD</th>
          <th>Extended Warranty</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        <tr>
          <td>Purchase Timeline</td>
          <td>At the time of Purchase or within 72 hours</td>
          <td>At the time of Purchase or within 72 hours</td>
          <td>Within 9 months</td>
        </tr>
        <tr>
          <td>Benefits</td>
          <td>Screen broken, or any kind of damage to display</td>
          <td>Too costly to get repair, ADLD makes easy</td>
          <td>
            Whole device damage and coverage included, defect and malfunction
          </td>
        </tr>
        <tr>
          <td>Coverage Period</td>
          <td>1st year of Device</td>
          <td>At the time of Purchase or within 72 hours</td>
          <td>After the expiry of in-warranty of company </td>
        </tr>
        <tr>
          <td>Sum Insured(SI)</td>
          <td>75%</td>
          <td>75%</td>
          <td>75%</td>
        </tr>
        <tr>
          <td>Depreciation</td>
          <td>25%</td>
          <td>25%</td>
          <td>25%</td>
        </tr>
        <tr>
          <td>No. of Service /Claim</td>
          <td>1 or upto SI</td>
          <td>1 or upto SI</td>
          <td>Unlimited to SI of Device Price</td>
        </tr>
        <tr>
          <td>Copayment</td>
          <td>Rs xxx or x% of device price (which is higher)</td>
          <td>Rs xxx or x% of device price (which is higher)</td>
          <td>Rs xxx or x% of device price (which is higher)</td>
        </tr>
      </tbody>
      <thead className={styles.thead2}>
        <tr>
          <th colSpan='4'>Whats is Covered and what’s not?</th>
        </tr>
      </thead>
      <tbody className={styles.tbody2}>
        <tr>
          <td>Screen Damage</td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
          <td>
            <FaTimesCircle className={styles.wrong} />
          </td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
        </tr>
        <tr>
          <td>Liquid Damage</td>
          <td>
            <FaTimesCircle className={styles.wrong} />
          </td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
        </tr>
        <tr>
          <td>Accidental Damage</td>
          <td>
            <FaTimesCircle className={styles.wrong} />
          </td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
        </tr>
        <tr>
          <td>Physical or Lorem Ispum</td>
          <td>
            <FaTimesCircle className={styles.wrong} />
          </td>
          <td>
            <FaTimesCircle className={styles.wrong} />
          </td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
        </tr>
        <tr>
          <td>Free Pick and Drop</td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
          <td>
            <BsCheckCircleFill className={styles.correct} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableInfo;
