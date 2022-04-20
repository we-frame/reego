import Image from 'next/image';
import { Accordion, Col, Row } from 'react-bootstrap';
import faqImg from '/public/images/faq-img.png';
import styles from '@/styles/products/Faqs.module.css';

const Faqs = () => {
  return (
    <section className={styles.faq}>
      <Row>
        <Col lg={6}>
          <Image src={faqImg} alt='faq' placeholder='blur' />
        </Col>
        <Col lg={6}>
          <h4 className='my-3 fw-bold text-center'>
            Frequently Asked Questions
          </h4>
          <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                What is Reego Extended Warranty?
              </Accordion.Header>
              <Accordion.Body>
                Reego Extended Warranty for a period of up to additional
                one-year beyond what the manufacturer provides. Extended
                Warranty is applicable for up to additional one year after the
                expiry of the manufacturer’s warranty. You can buy Extended
                Warranty till up to 6 months.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>What does it cover?</Accordion.Header>
              <Accordion.Body>
                The plan covers all malfunctions and manufacturing defects in
                the device, smartphone.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='2'>
              <Accordion.Header>
                How should one raise a request?
              </Accordion.Header>
              <Accordion.Body>
                Call us @ +91 829 8229 829, Register on Website. Explain the
                issue and we will register your request and process the further
                steps.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </section>
  );
};

export default Faqs;
