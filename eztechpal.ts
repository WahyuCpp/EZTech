import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, Calendar, Phone, Users, LogIn, LogOut, Clock, CheckCircle, Menu, X } from 'lucide-react';

type UserRole = 'employee' | 'customer' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

interface Service {
  id: string;
  customerName: string;
  phone: string;
  issue: string;
  status: 'pending' | 'in-progress' | 'completed';
  date: string;
}

interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  clockIn: string;
  clockOut?: string;
  date: string;
}

export default function EZTechPalembang() {
  const [currentPage, setCurrentPage] = useState<'home' | 'schedule' | 'contact' | 'employee' | 'customer'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showMessage, setShowMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    issue: '',
  });

  // Employee login state
  const [employeeLogin, setEmployeeLogin] = useState({
    email: '',
    password: '',
  });

  // Customer login/register state
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [isRegistering, setIsRegistering] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('eztech_current_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  // Mock schedules
  const schedules = [
    { day: 'Monday', hours: '09:00 AM - 06:00 PM', status: 'Open' },
    { day: 'Tuesday', hours: '09:00 AM - 06:00 PM', status: 'Open' },
    { day: 'Wednesday', hours: '09:00 AM - 06:00 PM', status: 'Open' },
    { day: 'Thursday', hours: '09:00 AM - 06:00 PM', status: 'Open' },
    { day: 'Friday', hours: '09:00 AM - 06:00 PM', status: 'Open' },
    { day: 'Saturday', hours: '10:00 AM - 04:00 PM', status: 'Open' },
    { day: 'Sunday', hours: 'Closed', status: 'Closed' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save service request
    const services = JSON.parse(localStorage.getItem('eztech_services') || '[]');
    const newService: Service = {
      id: Date.now().toString(),
      customerName: contactForm.name,
      phone: contactForm.phone,
      issue: contactForm.issue,
      status: 'pending',
      date: new Date().toISOString(),
    };
    services.push(newService);
    localStorage.setItem('eztech_services', JSON.stringify(services));

    setShowMessage(
      `Thank you ${contactForm.name}! Your service request has been received. We will contact you at ${contactForm.phone} shortly. Reference ID: ${newService.id}`
    );
    setContactForm({ name: '', phone: '', email: '', issue: '' });
    
    setTimeout(() => setShowMessage(''), 5000);
  };

  const handleEmployeeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock employee authentication
    const employees = JSON.parse(localStorage.getItem('eztech_employees') || '[]');
    const employee = employees.find((emp: any) => emp.email === employeeLogin.email);

    if (employee || employeeLogin.email === 'admin@eztech.com') {
      const user: User = employee || {
        id: '1',
        name: 'Admin User',
        email: 'admin@eztech.com',
        role: 'employee' as UserRole,
      };
      
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('eztech_current_user', JSON.stringify(user));
      setShowMessage('Login successful!');
      setTimeout(() => setShowMessage(''), 3000);
    } else {
      setShowMessage('Invalid credentials. Try admin@eztech.com with any password.');
      setTimeout(() => setShowMessage(''), 3000);
    }
  };

  const handleCustomerAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering) {
      // Register new customer
      const customers = JSON.parse(localStorage.getItem('eztech_customers') || '[]');
      const newCustomer: User = {
        id: Date.now().toString(),
        name: customerForm.name,
        email: customerForm.email,
        phone: customerForm.phone,
        role: 'customer' as UserRole,
      };
      customers.push(newCustomer);
      localStorage.setItem('eztech_customers', JSON.stringify(customers));
      
      setCurrentUser(newCustomer);
      setIsLoggedIn(true);
      localStorage.setItem('eztech_current_user', JSON.stringify(newCustomer));
      setShowMessage('Account created successfully!');
    } else {
      // Login existing customer
      const customers = JSON.parse(localStorage.getItem('eztech_customers') || '[]');
      const customer = customers.find((cust: any) => cust.email === customerForm.email);
      
      if (customer) {
        setCurrentUser(customer);
        setIsLoggedIn(true);
        localStorage.setItem('eztech_current_user', JSON.stringify(customer));
        setShowMessage('Login successful!');
      } else {
        setShowMessage('Account not found. Please register first.');
      }
    }
    
    setTimeout(() => setShowMessage(''), 3000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('eztech_current_user');
    setCurrentPage('home');
    setShowMessage('Logged out successfully!');
    setTimeout(() => setShowMessage(''), 3000);
  };

  const handleClockIn = () => {
    if (!currentUser) return;
    
    const attendances = JSON.parse(localStorage.getItem('eztech_attendances') || '[]');
    const today = new Date().toDateString();
    const existingToday = attendances.find(
      (att: Attendance) => att.employeeId === currentUser.id && new Date(att.date).toDateString() === today
    );

    if (existingToday && !existingToday.clockOut) {
      setShowMessage('You have already clocked in today!');
      setTimeout(() => setShowMessage(''), 3000);
      return;
    }

    const newAttendance: Attendance = {
      id: Date.now().toString(),
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      clockIn: new Date().toISOString(),
      date: new Date().toISOString(),
    };
    attendances.push(newAttendance);
    localStorage.setItem('eztech_attendances', JSON.stringify(attendances));
    setShowMessage('Clocked in successfully!');
    setTimeout(() => setShowMessage(''), 3000);
  };

  const handleClockOut = () => {
    if (!currentUser) return;
    
    const attendances = JSON.parse(localStorage.getItem('eztech_attendances') || '[]');
    const today = new Date().toDateString();
    const todayAttendance = attendances.find(
      (att: Attendance) => 
        att.employeeId === currentUser.id && 
        new Date(att.date).toDateString() === today &&
        !att.clockOut
    );

    if (!todayAttendance) {
      setShowMessage('Please clock in first!');
      setTimeout(() => setShowMessage(''), 3000);
      return;
    }

    todayAttendance.clockOut = new Date().toISOString();
    localStorage.setItem('eztech_attendances', JSON.stringify(attendances));
    setShowMessage('Clocked out successfully!');
    setTimeout(() => setShowMessage(''), 3000);
  };

  const getCustomerServices = () => {
    if (!currentUser) return [];
    const services = JSON.parse(localStorage.getItem('eztech_services') || '[]');
    return services.filter((service: Service) => 
      service.phone === currentUser.phone || service.customerName === currentUser.name
    );
  };

  const getEmployeeAttendances = () => {
    if (!currentUser) return [];
    const attendances = JSON.parse(localStorage.getItem('eztech_attendances') || '[]');
    return attendances.filter((att: Attendance) => att.employeeId === currentUser.id);
  };

  const renderNavigation = () => (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img src="https://placehold.co/40x40" alt="EZTech Palembang logo with phone repair symbol in blue and white color scheme" className="rounded" />
            <h1 className="text-xl font-bold">EZTech Palembang</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <Button
              variant={currentPage === 'home' ? 'secondary' : 'ghost'}
              onClick={() => setCurrentPage('home')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant={currentPage === 'schedule' ? 'secondary' : 'ghost'}
              onClick={() => setCurrentPage('schedule')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button
              variant={currentPage === 'contact' ? 'secondary' : 'ghost'}
              onClick={() => setCurrentPage('contact')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            {!isLoggedIn && (
              <>
                <Button
                  variant={currentPage === 'employee' ? 'secondary' : 'ghost'}
                  onClick={() => setCurrentPage('employee')}
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Employee
                </Button>
                <Button
                  variant={currentPage === 'customer' ? 'secondary' : 'ghost'}
                  onClick={() => setCurrentPage('customer')}
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Customer
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Button
              variant={currentPage === 'home' ? 'secondary' : 'ghost'}
              onClick={() => {
                setCurrentPage('home');
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant={currentPage === 'schedule' ? 'secondary' : 'ghost'}
              onClick={() => {
                setCurrentPage('schedule');
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button
              variant={currentPage === 'contact' ? 'secondary' : 'ghost'}
              onClick={() => {
                setCurrentPage('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            {!isLoggedIn && (
              <>
                <Button
                  variant={currentPage === 'employee' ? 'secondary' : 'ghost'}
                  onClick={() => {
                    setCurrentPage('employee');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Employee
                </Button>
                <Button
                  variant={currentPage === 'customer' ? 'secondary' : 'ghost'}
                  onClick={() => {
                    setCurrentPage('customer');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Customer
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                variant="ghost"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EZTech Palembang</h2>
          <p className="text-xl mb-8 opacity-90">Your Trusted Phone Repair Service in Palembang</p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setCurrentPage('contact')}
            className="text-lg px-8"
          >
            Get Service Now
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <img src="https://placehold.co/400x200" alt="Smartphone screen replacement service showing broken screen being repaired by technician with professional tools" className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">Screen Replacement</CardTitle>
              <CardDescription>
                Professional screen replacement for all phone models with high-quality parts and warranty.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <img src="https://placehold.co/400x200" alt="Battery replacement service with new phone battery and precision tools on repair workstation" className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">Battery Replacement</CardTitle>
              <CardDescription>
                Quick battery replacement service to restore your phones power and extend its life.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <img src="https://placehold.co/400x200" alt="Software repair service showing smartphone with diagnostic tools and laptop displaying repair software interface" className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">Software Repair</CardTitle>
              <CardDescription>
                Expert software troubleshooting and virus removal to keep your phone running smoothly.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose EZTech?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Expert Technicians</h4>
              <p className="text-sm text-muted-foreground">Certified professionals with years of experience</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Quick Service</h4>
              <p className="text-sm text-muted-foreground">Most repairs completed within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Warranty</h4>
              <p className="text-sm text-muted-foreground">90-day warranty on all repairs and parts</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Fair Pricing</h4>
              <p className="text-sm text-muted-foreground">Transparent pricing with no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="container mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-6 text-foreground">Visit Us Today</h3>
        <p className="text-lg mb-4 text-muted-foreground">Jl. Sudirman No. 123, Palembang</p>
        <p className="text-lg mb-4 text-muted-foreground">Phone: 0711-123456</p>
        <p className="text-lg mb-8 text-muted-foreground">Email: info@eztechpalembang.com</p>
        <Button size="lg" onClick={() => setCurrentPage('contact')}>
          Contact Us
        </Button>
      </section>
    </div>
  );

  const renderSchedule = () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Service Schedule</h2>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Weekly Operating Hours</CardTitle>
          <CardDescription>Visit us during these hours for phone repair services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.day}
                className="flex justify-between items-center p-4 rounded-lg bg-muted"
              >
                <span className="font-semibold text-foreground">{schedule.day}</span>
                <span className="text-muted-foreground">{schedule.hours}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    schedule.status === 'Open'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-destructive/20 text-destructive'
                  }`}
                >
                  {schedule.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> We are closed on public holidays
          </p>
          <p className="text-sm text-muted-foreground">
            For urgent repairs outside business hours, please contact us at 0711-123456
          </p>
        </CardFooter>
      </Card>
    </div>
  );

  const renderContact = () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Contact Us</h2>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Request Service</CardTitle>
          <CardDescription>Fill out the form below and we will contact you shortly</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Label htmlFor="contact-name">Full Name</Label>
              <Input
                id="contact-name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="contact-phone">Phone Number</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                required
                placeholder="08xx-xxxx-xxxx"
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email Address</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="contact-issue">Describe Your Issue</Label>
              <Textarea
                id="contact-issue"
                value={contactForm.issue}
                onChange={(e) => setContactForm({ ...contactForm, issue: e.target.value })}
                required
                placeholder="Please describe the problem with your phone"
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Service Request
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Jl. Sudirman No. 123</p>
            <p className="text-muted-foreground">Palembang, South Sumatra</p>
            <p className="text-muted-foreground">Indonesia 30111</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Phone: 0711-123456</p>
            <p className="text-muted-foreground">WhatsApp: 0812-3456-7890</p>
            <p className="text-muted-foreground">Email: info@eztechpalembang.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEmployeePortal = () => {
    if (!isLoggedIn || currentUser?.role !== 'employee') {
      return (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Employee Portal</h2>
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Employee Login</CardTitle>
              <CardDescription>Access your employee dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmployeeLogin} className="space-y-4">
                <div>
                  <Label htmlFor="emp-email">Email</Label>
                  <Input
                    id="emp-email"
                    type="email"
                    value={employeeLogin.email}
                    onChange={(e) => setEmployeeLogin({ ...employeeLogin, email: e.target.value })}
                    required
                    placeholder="employee@eztech.com"
                  />
                </div>
                <div>
                  <Label htmlFor="emp-password">Password</Label>
                  <Input
                    id="emp-password"
                    type="password"
                    value={employeeLogin.password}
                    onChange={(e) => setEmployeeLogin({ ...employeeLogin, password: e.target.value })}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Demo: Use admin@eztech.com with any password
              </p>
            </CardFooter>
          </Card>
        </div>
      );
    }

    const attendances = getEmployeeAttendances();
    const todayAttendance = attendances.find(
      (att) => new Date(att.date).toDateString() === new Date().toDateString()
    );

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Employee Dashboard</h2>
            <p className="text-muted-foreground">Welcome back, {currentUser.name}!</p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://placehold.co/100x100" alt="Employee profile picture with professional business attire in corporate setting" />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Clock</CardTitle>
              <CardDescription>Mark your attendance for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayAttendance ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-foreground">Clock In</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(todayAttendance.clockIn).toLocaleTimeString()}
                    </span>
                  </div>
                  {todayAttendance.clockOut ? (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium text-foreground">Clock Out</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(todayAttendance.clockOut).toLocaleTimeString()}
                      </span>
                    </div>
                  ) : (
                    <Button onClick={handleClockOut} className="w-full" variant="destructive">
                      <Clock className="w-4 h-4 mr-2" />
                      Clock Out
                    </Button>
                  )}
                </div>
              ) : (
                <Button onClick={handleClockIn} className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  Clock In
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today Statistics</CardTitle>
              <CardDescription>Your attendance summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Days Worked</span>
                  <span className="text-lg font-bold text-foreground">{attendances.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="text-lg font-bold text-foreground">
                    {
                      attendances.filter(
                        (att) => new Date(att.date).getMonth() === new Date().getMonth()
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      todayAttendance
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {todayAttendance ? 'Present' : 'Not Clocked In'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Your recent attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {attendances.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No attendance records yet</p>
              ) : (
                attendances
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 10)
                  .map((att) => (
                    <div
                      key={att.id}
                      className="flex justify-between items-center p-4 rounded-lg bg-muted"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {new Date(att.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          In: {new Date(att.clockIn).toLocaleTimeString()} 
                          {att.clockOut && ` | Out: ${new Date(att.clockOut).toLocaleTimeString()}`}
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCustomerPortal = () => {
    if (!isLoggedIn || currentUser?.role !== 'customer') {
      return (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Customer Portal</h2>
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>{isRegistering ? 'Create Account' : 'Customer Login'}</CardTitle>
              <CardDescription>
                {isRegistering ? 'Register for a new account' : 'Access your service history'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCustomerAuth} className="space-y-4">
                {isRegistering && (
                  <>
                    <div>
                      <Label htmlFor="cust-name">Full Name</Label>
                      <Input
                        id="cust-name"
                        value={customerForm.name}
                        onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cust-phone">Phone Number</Label>
                      <Input
                        id="cust-phone"
                        type="tel"
                        value={customerForm.phone}
                        onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                        required
                        placeholder="08xx-xxxx-xxxx"
                      />
                    </div>
                  </>
                )}
                <div>
                  <Label htmlFor="cust-email">Email</Label>
                  <Input
                    id="cust-email"
                    type="email"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="cust-password">Password</Label>
                  <Input
                    id="cust-password"
                    type="password"
                    value={customerForm.password}
                    onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isRegistering ? 'Register' : 'Login'}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                variant="link"
                className="w-full"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    const services = getCustomerServices();

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Customer Dashboard</h2>
            <p className="text-muted-foreground">Welcome back, {currentUser.name}!</p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://placehold.co/100x100" alt="Customer profile picture with friendly smile in casual setting" />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">{services.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">
                {services.filter((s) => s.status === 'pending').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">
                {services.filter((s) => s.status === 'completed').length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Service History</CardTitle>
            <CardDescription>Your repair service requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No service requests yet</p>
                  <Button onClick={() => setCurrentPage('contact')}>
                    Request Service
                  </Button>
                </div>
              ) : (
                services
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((service) => (
                    <div key={service.id} className="p-4 rounded-lg border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-foreground">Request #{service.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(service.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            service.status === 'completed'
                              ? 'bg-primary/20 text-primary'
                              : service.status === 'in-progress'
                              ? 'bg-accent/20 text-accent'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{service.issue}</p>
                      {service.status === 'completed' && (
                        <p className="text-sm text-primary mt-2">
                          Service completed! Thank you for choosing EZTech Palembang.
                        </p>
                      )}
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium text-foreground">{currentUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground">{currentUser.email}</span>
              </div>
              {currentUser.phone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium text-foreground">{currentUser.phone}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {renderNavigation()}

      {showMessage && (
        <div className="bg-primary text-primary-foreground px-4 py-3 text-center">
          {showMessage}
        </div>
      )}

      <main className="py-8">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'schedule' && renderSchedule()}
        {currentPage === 'contact' && renderContact()}
        {currentPage === 'employee' && renderEmployeePortal()}
        {currentPage === 'customer' && renderCustomerPortal()}
      </main>

      <footer className="bg-muted text-muted-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">&copy; 2024 EZTech Palembang. All rights reserved.</p>
          <p className="text-sm">Your trusted phone repair service in Palembang</p>
        </div>
      </footer>
    </div>
  );
}
