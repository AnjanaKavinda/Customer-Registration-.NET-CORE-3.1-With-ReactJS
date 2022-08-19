import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import {
  getcustomers,
  postcustomers,
  updatecustomers,
  deletecustomer,
  cleancustomer,
} from "../redux/actions/customersActions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Customer() {
  const [customerName, setcustomerName] = useState("");
  const [customerContactNo, setcustomerContactNo] = useState("");
  const [customerEmail, setcustomerEmail] = useState("");
  const [customerAddress, setcustomerAddress] = useState("");
  const [searchString, setsearchString] = useState("");
  const [objectArray, setobjectArray] = useState([]);

  const [customerNameError, setcustomerNameError] = useState("");
  const [customerContactNoError, setcustomerContactNoError] = useState("");
  const [customerEmailError, setcustomerEmailError] = useState("");
  const [customerAddressError, setcustomerAddressError] = useState("");
  const postDispatch = useDispatch();
  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.allcustomers.details);

  const successPostNotification = () =>
    toast("The data has been successfully saved.!", { autoClose: 3500 });
  const successUpdateNotification = () =>
    toast("The data has been successfully updated.!", { autoClose: 3500 });
  const successDeleteNotification = () =>
    toast("The data has been successfully deleted.!", { autoClose: 3500 });

  const validaate = () => {
    var validationError = false;

    if (customerName === "") {
      setcustomerNameError("Name is required!");
      validationError = true;
    }
    if (customerContactNo === "") {
      setcustomerContactNoError("Contact number is required!");
      validationError = true;
    } else if (customerContactNo.length > 10 || customerContactNo.length < 10) {
      setcustomerContactNoError("Please enter valide contact number!");
      validationError = true;
    }

    if (customerEmail === "") {
      setcustomerEmailError("Email is required!");
      validationError = true;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(customerEmail)
    ) {
      setcustomerEmailError("Please enter valide contact email!");
      validationError = true;
    }

    if (customerAddress === "") {
      setcustomerAddressError("Address is required!");
      validationError = true;
    }

    if (!validationError) {
      setcustomerNameError("");
      setcustomerContactNoError("");
      setcustomerEmailError("");
      setcustomerAddressError("");
      validationError = false;
    }

    return validationError;
  };
  const postState = useSelector((state) => state.postcustommer.Response);
  const updateState = useSelector((state) => state.updatetcustommer.Response);
  const deleteState = useSelector((state) => state.deletecustommer.Response);

  const clickHandler = async (e) => {
    if (!validaate()) {
      e.preventDefault();
      const finaldata = {
        Name: customerName,
        PhoneNo: customerContactNo,
        Email: customerEmail,
        Address: customerAddress,
      };
      await postDispatch(postcustomers(finaldata));
      clearFormData();
      await dispatch(getcustomers());
    }
  };
  useEffect(() => {
    if (postState && postState === 201) {
      successPostNotification();
      dispatch(cleancustomer("post"));
    }
    if (updateState && updateState === 201) {
      successUpdateNotification();
      dispatch(cleancustomer("update"));
    }
    if (deleteState && deleteState === 200) {
      successDeleteNotification();
      dispatch(cleancustomer("delete"));
    }
  }, [postState, updateState, deleteState, dispatch]);

  const UpdatConfermationHandler = async (e) => {
    if (!validaate()) {
      confirmAlert({
        message: "Do you want to update this record?.",
        buttons: [
          {
            className: "updateConferm",
            label: "Yes",
            onClick: () => {
              dataUpdateHandler(e);
              document.getElementById("clearId").setAttribute("hidden", true);
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  const dataUpdateHandler = async (e) => {
    e.preventDefault();
    const finaldata = {
      Id: e.target.value,
      Name: customerName,
      PhoneNo: customerContactNo,
      Email: customerEmail,
      Address: customerAddress,
    };
    await postDispatch(updatecustomers(finaldata, e.target.value));
    clearFormData();
    await dispatch(getcustomers());

    document.getElementById("saveId").removeAttribute("hidden");
    document.getElementById("updateId").setAttribute("hidden", true);
  };

  const updateButtonHandler = (e) => {
    if (responseData) {
      document.getElementById("updateId").value = e.target.value;
      document.getElementById("updateId").removeAttribute("hidden");
      document.getElementById("clearId").removeAttribute("hidden");
      document.getElementById("saveId").setAttribute("hidden", true);
      const res = responseData.find(
        (element) => element.Id === parseInt(e.target.value)
      );
      console.log(res);
      setcustomerName(res.Name);
      setcustomerContactNo(res.PhoneNo);
      setcustomerEmail(res.Email);
      setcustomerAddress(res.Address);
    }
  };

  const deleteConfermationHandler = async (e) => {
    confirmAlert({
      message: "Do you want to delete this record?.",
      buttons: [
        {
          className: "deleteConferm",
          label: "Yes",
          onClick: () => {
            deleteHandler(e);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteHandler = async (e) => {
    console.log("delete");
    await postDispatch(deletecustomer(e.target.value));
    await dispatch(getcustomers());
  };

  const fieldChangeHandler = async (e) => {
    if (e.target.id === "customerName") {
      setcustomerName(e.target.value);
      setcustomerNameError("");
    } else if (e.target.id === "customerContactNo") {
      setcustomerContactNo(e.target.value);
      setcustomerContactNoError("");
    } else if (e.target.id === "customerEmail") {
      setcustomerEmail(e.target.value);
      setcustomerEmailError("");
    } else if (e.target.id === "customeraddress") {
      setcustomerAddress(e.target.value);
      setcustomerAddressError("");
    }
  };

  const ClearDataHandler = async () => {
    clearFormData();
    document.getElementById("saveId").removeAttribute("hidden");
    document.getElementById("updateId").setAttribute("hidden", true);
    document.getElementById("clearId").setAttribute("hidden", true);
  };

  const clearFormData = async () => {
    setcustomerName("");
    setcustomerContactNo("");
    setcustomerEmail("");
    setcustomerAddress("");
  };
  var objectArr = [];

  const serchHandler = async (e) => {
    setsearchString(e.target.value);
    if (e.target.value) {
      document.getElementById("custommertableId").setAttribute("hidden", true);
      document.getElementById("searchResulttableId").removeAttribute("hidden");
      if (responseData) {
        const res = responseData.find(
          (element) =>
            element.Name.toLowerCase() === e.target.value.toLowerCase()
        );
        if (res) {
          objectArr.push(res);
          setobjectArray(objectArr);
        }
      }
    } else {
      document.getElementById("custommertableId").removeAttribute("hidden");
      document
        .getElementById("searchResulttableId")
        .setAttribute("hidden", true);
    }
  };

  var searchResult =
    objectArray &&
    objectArray.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.Name}</td>
          <td>{data.PhoneNo}</td>
          <td>{data.Email}</td>
          <td>{data.Address}</td>
          <td>
            <Button
              variant="success"
              value={data.Id}
              onClick={(e) => updateButtonHandler(e)}
            >
              Update
            </Button>{" "}
            <Button
              variant="danger"
              value={data.Id}
              onClick={(e) => deleteConfermationHandler(e)}
            >
              Delete
            </Button>{" "}
          </td>
        </tr>
      );
    });

  var result =
    responseData &&
    responseData.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.Name}</td>
          <td>{data.PhoneNo}</td>
          <td>{data.Email}</td>
          <td>{data.Address}</td>
          <td>
            <Button
              variant="success"
              value={data.Id}
              onClick={(e) => updateButtonHandler(e)}
            >
              Update
            </Button>{" "}
            <Button
              variant="danger"
              value={data.Id}
              onClick={(e) => deleteConfermationHandler(e)}
            >
              Delete
            </Button>{" "}
          </td>
        </tr>
      );
    });

  useEffect(() => {
    dispatch(getcustomers());
  }, [dispatch]);

  return (
    <div className="body">
      <ToastContainer />
      <Form className="mb-3">
        <Form.Group className="firstName">
          <Form.Label htmlFor="firstName">Customer Name</Form.Label>
          <Form.Control
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => fieldChangeHandler(e)}
          />
          {customerNameError ? (
            <span style={{ color: "red" }}>{customerNameError}</span>
          ) : null}
        </Form.Group>
        <Form.Group className="Contact_No">
          <Form.Label htmlFor="Contact_No">Contact No</Form.Label>
          <Form.Control
            type="text"
            id="customerContactNo"
            value={customerContactNo}
            onChange={(e) => fieldChangeHandler(e)}
          />
          {customerContactNoError ? (
            <span style={{ color: "red" }}>{customerContactNoError}</span>
          ) : null}
        </Form.Group>
        <Form.Group className="email">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            id="customerEmail"
            value={customerEmail}
            onChange={(e) => fieldChangeHandler(e)}
          />
          {customerEmailError ? (
            <span style={{ color: "red" }}>{customerEmailError}</span>
          ) : null}
        </Form.Group>
        <Form.Group className="address">
          <Form.Label htmlFor="address">Address</Form.Label>
          <Form.Control
            type="text"
            id="customeraddress"
            value={customerAddress}
            onChange={(e) => fieldChangeHandler(e)}
          />
          {customerAddressError ? (
            <span style={{ color: "red" }}>{customerAddressError}</span>
          ) : null}
        </Form.Group>
        <Button
          className="mt-3"
          variant="primary"
          id="saveId"
          onClick={(e) => clickHandler(e)}
        >
          Save Data
        </Button>
        <Button
          className="mt-3 me-3"
          variant="primary"
          id="updateId"
          onClick={(e) => UpdatConfermationHandler(e)}
          hidden
        >
          Update Data
        </Button>
        <Button
          className="mt-3"
          variant="primary"
          id="clearId"
          onClick={(e) => ClearDataHandler()}
          hidden
        >
          Clear Data
        </Button>
      </Form>
      <Row>
        <Col sm={5} className="mb-3">
          <Form.Control
            value={searchString}
            placeholder="Search Customers"
            onChange={(e) => serchHandler(e)}
          />
        </Col>
      </Row>
      <Table
        striped
        bordered
        hover
        id="searchResulttableId"
        className="mb-3"
        hidden
      >
        <thead>
          <tr>
            <td>Customer Name</td>
            <td>Contact No</td>
            <td>Email</td>
            <td>Address</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>{searchResult}</tbody>
      </Table>
      <Table striped bordered hover id="custommertableId">
        <thead>
          <tr>
            <td>Customer Name</td>
            <td>Contact No</td>
            <td>Email</td>
            <td>Address</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </Table>
    </div>
  );
}

export default Customer;
