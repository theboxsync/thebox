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
  items: Yup.array()
    .of(
      Yup.object().shape({
        item_name: Yup.string().required("Item Name is required"),
        unit: Yup.string().required("Unit is required"),
        item_quantity: Yup.number()
          .typeError("Quantity must be a number") // handles non-numeric input
          .required("Item Quantity is required")
          .positive("Quantity must be greater than 0"),
      })
    )
    .min(1, "At least one item is required"), // optional: at least one item
  status: Yup.string().required("Status is required"),
});

const addInventory = Yup.object().shape({
  bill_date: Yup.date().required("Bill date is required"),
  bill_number: Yup.string().required("Bill number is required"),
  vendor_name: Yup.string().required("Vendor name is required"),
  category: Yup.string().required("Category is required"),
  bill_files: Yup.string().required("Bill files is required"),
  total_amount: Yup.number()
    .required("Total amount is required")
    .positive("Total amount must be positive"),
  paid_amount: Yup.number()
    .required("Paid amount is required")
    .positive("Paid amount must be positive"),
  items: Yup.array().of(
    Yup.object().shape({
      item_name: Yup.string().required("Item name is required"),
      item_quantity: Yup.number()
        .required("Quantity is required")
        .positive("Quantity must be positive"),
      unit: Yup.string().required("Unit is required"),
      item_price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
    })
  ),
});

const completeInventory = Yup.object().shape({
  bill_date: Yup.date().required("Bill date is required"),
  bill_number: Yup.string().required("Bill number is required"),
  vendor_name: Yup.string().required("Vendor name is required"),
  category: Yup.string().required("Category is required"),
  bill_files: Yup.mixed().test(
    "fileRequired",
    "Bill files are required",
    function (value) {
      return value && value.length > 0;
    }
  ),
  total_amount: Yup.number()
    .required("Total amount is required")
    .positive("Total amount must be positive"),
  paid_amount: Yup.number()
    .required("Paid amount is required")
    .positive("Paid amount must be positive"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        item_name: Yup.string().required("Item name is required"),
        item_quantity: Yup.number()
          .required("Quantity is required")
          .positive("Quantity must be positive"),
        unit: Yup.string().required("Unit is required"),
        completed: Yup.boolean(),
        item_price: Yup.number()
          .nullable()
          .transform((value, originalValue) =>
            String(originalValue).trim() === "" ? 0 : value
          )
          .when("completed", {
            is: true,
            then: (schema) => schema.required("Price is required"),
            otherwise: (schema) => schema.notRequired(),
          }),
      })
    )
    .min(1, "At least one item must be included")
    .test(
      "at-least-one-completed",
      "At least one item must be marked as completed",
      (items) => items && items.some((item) => item.completed)
    ),
});

const addManager = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const editManager = Yup.object({
  username: Yup.string().required("Username is required"),
});

const addStaff = Yup.object({
  staff_id: Yup.string()
    .required("Staff ID is required")
    .matches(/^[A-Za-z0-9]+$/, "Staff ID must be alphanumeric"),
  f_name: Yup.string()
    .required("First name is required")
    .matches(/^[A-Za-z\s]+$/, "First name must only contain letters"),
  l_name: Yup.string()
    .required("Last name is required")
    .matches(/^[A-Za-z\s]+$/, "Last name must only contain letters"),
  birth_date: Yup.date()
    .required("Birth date is required")
    .max(new Date(), "Birth date cannot be in the future"),
  joining_date: Yup.date()
    .required("Joining date is required")
    .min(Yup.ref("birth_date"), "Joining date must be after birth date"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  phone_no: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
  salary: Yup.number()
    .required("Salary is required")
    .positive("Salary must be a positive number"),
  position: Yup.string().required("Position is required"),
  photo: Yup.mixed()
    .required("Photo is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          ))
    ),
  document_type: Yup.string()
    .required("Document type is required")
    .oneOf(
      ["National Identity Card", "Pan Card", "Voter Card"],
      "Invalid document type"
    ),
  id_number: Yup.string().required("ID number is required"),
  front_image: Yup.mixed()
    .required("Front ID image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          ))
    ),
  back_image: Yup.mixed()
    .required("Back ID image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          ))
    ),
});

const editStaff = Yup.object({
  staff_id: Yup.string()
    .required("Staff ID is required")
    .matches(/^[A-Za-z0-9]+$/, "Staff ID must be alphanumeric"),
  f_name: Yup.string()
    .required("First name is required")
    .matches(/^[A-Za-z\s]+$/, "First name must only contain letters"),
  l_name: Yup.string()
    .required("Last name is required")
    .matches(/^[A-Za-z\s]+$/, "Last name must only contain letters"),
  birth_date: Yup.date()
    .required("Birth date is required")
    .max(new Date(), "Birth date cannot be in the future"),
  joining_date: Yup.date()
    .required("Joining date is required")
    .min(Yup.ref("birth_date"), "Joining date must be after birth date"),
  address: Yup.string().required("Address is required"),
  phone_no: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
  salary: Yup.number()
    .required("Salary is required")
    .positive("Salary must be a positive number"),
  position: Yup.string().required("Position is required"),

  photo: Yup.mixed()
    .notRequired()
    .test(
      "fileCheck",
      "File must be a valid image (jpeg, png, jpg, webp) and smaller than 2MB",
      (value) => {
        console.log("Value : ", value);
        if (!value) return true; // Skip validation if no file is selected
        return (
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          ) && value.size <= 2 * 1024 * 1024
        );
      }
    ),

  // Updated validation for images to not be required

  document_type: Yup.string()
    .required("Document type is required")
    .oneOf(
      ["National Identity Card", "Pan Card", "Voter Card"],
      "Invalid document type"
    ),

  id_number: Yup.string().required("ID number is required"),

  front_image: Yup.mixed()
    .notRequired()
    .test(
      "fileCheck",
      "File must be a valid image (jpeg, png, jpg, webp) and smaller than 2MB",
      (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return (
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          ) && value.size <= 2 * 1024 * 1024
        );
      }
    ),

  back_image: Yup.mixed()
    .notRequired()
    .test(
      "fileCheck",
      "File must be a valid image (jpeg, png, jpg, webp) and smaller than 2MB",
      (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return (
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          ) && value.size <= 2 * 1024 * 1024
        );
      }
    ),
});

const addQSR = Yup.object().shape({
  username: Yup.string().required("QSR Name is required"),
  password: Yup.string().required("Password is required"),
});

const editQsr = Yup.object().shape({
  username: Yup.string().required("QSR Name is required"),
});

export {
  signupSchema1,
  signupSchema2,
  signupSchema3,
  addTable,
  addMenu,
  requestInventory,
  addInventory,
  completeInventory,
  editDish,
  addManager,
  editManager,
  addStaff,
  editStaff,
  addQSR,
  editQsr,
};
