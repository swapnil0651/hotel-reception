document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on
    const isCheckInPage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    const isCustomersPage = window.location.pathname === '/customers' || window.location.pathname === '/customers.html';
  
    if (isCheckInPage) {
      setupCheckInForm();
    } else if (isCustomersPage) {
      loadCustomers();
      setupSearchFilter();
      setupModal();
    }
  });
  
  // Check-In Form Setup
  function setupCheckInForm() {
    const checkInForm = document.getElementById('checkInForm');
    
    if (checkInForm) {
      checkInForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          roomNumber: document.getElementById('roomNumber').value,
          checkOutDate: document.getElementById('checkOutDate').value,
          idType: document.getElementById('idType').value,
          idNumber: document.getElementById('idNumber').value
        };
        
        try {
          const response = await fetch('/api/customers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          
          if (response.ok) {
            alert('Customer checked in successfully!');
            checkInForm.reset();
          } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while checking in the customer.');
        }
      });
    }
  }
  
  // Load Customers
  async function loadCustomers() {
    const customersTableBody = document.getElementById('customersTableBody');
    
    if (customersTableBody) {
      try {
        const response = await fetch('/api/customers');
        const customers = await response.json();
        
        customersTableBody.innerHTML = '';
        
        if (customers.length === 0) {
          customersTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No customers checked in</td></tr>';
          return;
        }
        
        customers.forEach(customer => {
          const checkInDate = new Date(customer.checkInDate).toLocaleDateString();
          const checkOutDate = new Date(customer.checkOutDate).toLocaleDateString();
          
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${customer.roomNumber}</td>
            <td>${customer.firstName} ${customer.lastName}</td>
            <td>${checkInDate}</td>
            <td>${checkOutDate}</td>
            <td>
              <button class="action-btn view" data-id="${customer._id}">View</button>
              <button class="action-btn delete" data-id="${customer._id}">Check Out</button>
            </td>
          `;
          
          customersTableBody.appendChild(row);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.view').forEach(button => {
          button.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            viewCustomerDetails(customerId);
          });
        });
        
        document.querySelectorAll('.delete').forEach(button => {
          button.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            checkOutCustomer(customerId);
          });
        });
        
      } catch (error) {
        console.error('Error:', error);
        customersTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Error loading customers</td></tr>';
      }
    }
  }
  
  // Search Filter Setup
  function setupSearchFilter() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
      searchInput.addEventListener('keyup', function() {
        const searchValue = this.value.toLowerCase();
        const rows = document.querySelectorAll('#customersTableBody tr');
        
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchValue)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    }
  }
  
  // Modal Setup
  function setupModal() {
    const modal = document.getElementById('customerModal');
    const closeBtn = document.querySelector('.close');
    
    if (modal && closeBtn) {
      closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
      });
      
      window.addEventListener('click', function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  }
  
  // View Customer Details
  async function viewCustomerDetails(customerId) {
    const modal = document.getElementById('customerModal');
    const customerDetails = document.getElementById('customerDetails');
    
    if (modal && customerDetails) {
      try {
        const response = await fetch(`/api/customers/${customerId}`);
        const customer = await response.json();
        
        const checkInDate = new Date(customer.checkInDate).toLocaleDateString();
        const checkOutDate = new Date(customer.checkOutDate).toLocaleDateString();
        
        customerDetails.innerHTML = `
          <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
          <p><strong>Email:</strong> ${customer.email}</p>
          <p><strong>Phone:</strong> ${customer.phone}</p>
          <p><strong>Room Number:</strong> ${customer.roomNumber}</p>
          <p><strong>Check-In Date:</strong> ${checkInDate}</p>
          <p><strong>Check-Out Date:</strong> ${checkOutDate}</p>
          <p><strong>ID Type:</strong> ${customer.idType}</p>
          <p><strong>ID Number:</strong> ${customer.idNumber}</p>
        `;
        
        modal.style.display = 'block';
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading customer details.');
      }
    }
  }
  
  // Check Out Customer
  async function checkOutCustomer(customerId) {
    if (confirm('Are you sure you want to check out this customer?')) {
      try {
        const response = await fetch(`/api/customers/${customerId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('Customer checked out successfully!');
          loadCustomers(); // Reload the customers list
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while checking out the customer.');
      }
    }
  }