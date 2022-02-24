import Link from 'next/link';

const fail = () => {
    return (
        <>
            <div className="jumbotron text-center height: 100%;">
                <h1 className="display-3">Transaction Failed !</h1>
                <p className="lead">
                    <Link className="btn btn-primary btn-sm bg-danger text-light btn-outline-danger" href="/" role="button" >Continue to Home</Link>
                </p>
            </div>
        </>
    );
}

export default fail;