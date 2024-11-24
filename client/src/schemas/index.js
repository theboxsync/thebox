import * as Yup from "yup";

const signupSchema1 = Yup.object({
  name: Yup.string().required("Company Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  logo: Yup.string().required("Company Logo is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]\d{9}$/, "Invalid Mobile Number"),
});

const signupSchema2 = Yup.object({
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  // city : Yup.string().required("City is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]\d{5}$/, "Invalid Pincode"),
});

const signupSchema3 = Yup.object({
  gst_no: Yup.string()
    .required("GST number is required")
    .matches(
      /^[0-9]\d{1}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GST number"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  cpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const addTable = Yup.object({
  area: Yup.string().required("Dining Type is required"),
  tables: Yup.array().of(
    Yup.object().shape({
      table_no: Yup.string().required("Table Number is required"),
      max_person: Yup.string()
        .required("Max Person is required")
        .matches(/[0-9]$/, "Invalid Max Person"),
    })
  ),
});

const addMenu = Yup.object().shape({
  category: Yup.string().required("Dish Type is required"),
  meal_type: Yup.string().required("Meal Type is required"),
  dishes: Yup.array().of(
    Yup.object().shape({
      dish_name: Yup.string().required("Dish Name is required"),
      dish_price: Yup.string()
        .required("Price is required")
        .matches(/[0-9]$/, "Price must be a number"),
      quantity: Yup.string().when("showAdvancedOptions", {
        is: true,
        then: () =>
          Yup.string()
            .required("Quantity is required")
            .matches(/[0-9]$/, "Quantity must be a number"),
        otherwise: () => Yup.string().nullable(),
      }),
      unit: Yup.string().when("showAdvancedOptions", {
        is: true,
        then: () => Yup.string().required("Unit is required"),
        otherwise: () => Yup.string().nullable(),
      }),
    })
  ),
});

const editDish = Yup.object({
  dish_name: Yup.string().required("Dish Name is required"),
  dish_price: Yup.string()
    .required("Price is required")
    .matches(/[0-9]$/, "Price must be number"),
});

const requestInventory = Yup.object({
  items : Yup.array().of(
    Yup.object().shape({
      item_name: Yup.string().required("Item Name is required"),
      unit: Yup.string().required("Unit is required"),
      item_quantity: Yup.string()
        .required("Item Quantity is required")
        .matches(/[0-9]$/, "Quantity must be number"),
    })
  ),
  status: Yup.string().required("Status is required"),
});

const addInventory = Yup.object({
  bill_date: Yup.string().required("Bill Date is required"),
  bill_number: Yup.string().required("Bill Number is required"),
  vendor_name: Yup.string().required("Vendor Name is required"),
  category: Yup.string().required("Category is required"),
  bill_image: Yup.string().required("Bill Image is required"),
  total_amount: Yup.string().required("Total Amount is required"),
  paid_amount: Yup.string().required("Paid Amount is required"),
  item_name: Yup.string().required("Item Name is required"),
  unit: Yup.string().required("Unit is required"),
  item_quantity: Yup.string()
    .required("Item Quantity is required")
    .matches(/^\d*\.?\d*$/, "Quantity must be number or decimal"),
  item_price: Yup.string()
    .required("Item Price is required")
    .matches(/[0-9]$/, "Price must be number"),
});

const addManager = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const editManager = Yup.object({
  username: Yup.string().required("Username is required"),
});

export {
  signupSchema1,
  signupSchema2,
  signupSchema3,
  addTable,
  addMenu,
  requestInventory,
  addInventory,
  editDish,
  addManager,
  editManager,
};
