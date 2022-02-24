import Link from 'next/link';

const success = () => {
    return (
        <>
            <div className="jumbotron text-center height: 100%;">
                <h1 className="display-3">Thank You!</h1>
                <p className="lead"><strong>Please check orders</strong> for to track your orders.</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-sm bg-success text-light btn-outline-success" href="/account/orders" role="button" >Continue to Orders</Link>
                </p>
            </div>
        </>
    );
}

export default success;