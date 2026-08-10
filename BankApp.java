import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class BankApp {
    static Scanner scanner = new Scanner(System.in);
    static int customerCounter = 1;
    static int accountCounter = 1;

    public static void main(String[] args) {

        //  Initialized customers
        List<Customer> startCustomers = new ArrayList<>();
        startCustomers.add(new Customer(customerCounter++, "John Doe", "jdoe@gmail.com"));
        startCustomers.add(new Customer(customerCounter++, "Jane Doe", "jdoe@yahoo.com"));
        Bank bank = new Bank(startCustomers);

        System.out.println("Welcome to the bank!");

        while (true) {
            //  Options
            System.out.println("1. Create new customer");
            System.out.println("2. List customers");
            System.out.println("3. Create new account");
            System.out.println("4. List accounts of a customer");
            System.out.println("5. Make transaction\n");

            int option = scanner.nextInt();
            scanner.nextLine();

            switch (option) {
                case 1:
                    createCustomer(bank, customerCounter++);
                    break;
                case 2:
                    System.out.println(bank.getCustomers());
                    break;
                case 3:
                    createAccount(bank, accountCounter);
                    break;
                case 4:
                    listAccounts(bank);
                    break;
                case 5:
                    makeTransaction(bank);
                    break;
                default:
                    System.out.println("Not a valid option!");
            }

            System.out.println("Continue using the bank? (y / n)");
            String sentinel = scanner.nextLine();

            if (sentinel.equalsIgnoreCase("n")) {
                System.out.println("Goodbye!");
                break;
            }
        }
    }

    private static void createCustomer(Bank bank, int customerId) {
        System.out.println("Enter name: ");
        String name = scanner.nextLine();
        System.out.println("Enter email: ");
        String email = scanner.nextLine();
        bank.addCustomer(customerId, name, email);
    }

    private static void createAccount(Bank bank, int accountId) {
        System.out.println("Enter Customer ID: ");
        int customerId = scanner.nextInt();
        scanner.nextLine();

        Customer customer = bank.getCustomer(customerId);
        if (customer != null) {
            System.out.println("'savings' or 'checking' account?");
            String type = scanner.nextLine();
            customer.createAccount(type, accountCounter++);
        }
        else {
            System.out.println("No ID for customer found!");
        }
    }

    private static void listAccounts(Bank bank) {
        System.out.println("Enter Customer ID: ");
        int customerId = scanner.nextInt();
        scanner.nextLine();

        Customer customer = bank.getCustomer(customerId);

        if (customer != null) {
            System.out.println(customer.getAccounts());
        }
        else {
            System.out.println("No ID for customer found!");
        }
    }

    private static void makeTransaction(Bank bank) {
        System.out.println("Enter Account ID: ");
        int accountId = scanner.nextInt();
        scanner.nextLine();
        Account account = bank.findAccount(accountId);

        if (account != null) {
            System.out.println("Withdraw or Deposit? (w / d)");
            String option = scanner.nextLine();
            if (option.equalsIgnoreCase("w")) {
                System.out.println("Withdraw how much? (Current Balance: $" + account.getBalance() + ")");
                System.out.println("Enter amount: ");
                float amount = scanner.nextFloat();
                scanner.nextLine();

                if (account.withdraw(amount)) {
                    System.out.println("New amount: $" + account.getBalance());
                }
                else {
                    System.out.println("Transaction could not happen");
                }
            }
            else if (option.equalsIgnoreCase("d")) {
                System.out.println("Deposit how much? (Current Balance: $" + account.getBalance() + ")");
                System.out.println("Enter amount: ");
                float amount = scanner.nextFloat();
                scanner.nextLine();
                account.deposit(amount);
                System.out.println("New amount: $" + account.getBalance());
            }
            else {
                System.out.println("Not a valid option! must be 'w' or 'd'");
            }
        }
        else {
            System.out.println("No ID for account found!");
        }
    }
}

class Bank {
    List<Customer> customers = new ArrayList<>();

    public Bank(List<Customer> customers) {
        this.customers = customers;
    }

    public Customer getCustomer(String name, String email) {
        for (Customer c: customers) {
            if (c.getName().equals(name) && c.getEmail().equals(email)) {
                return c;
            }
        }
        return null;
    }

    //  Overloaded method for ease of input
    public Customer getCustomer(int id) {
        for (Customer c: customers) {
            if (c.getCustomerId() == id) {
                return c;
            }
        }
        return null;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }

    public List<Customer> getCustomers() {
        return customers;
    }

    public void addCustomer(int customerId, String name, String email) {
        Customer customer = new Customer(customerId, name, email);
        customers.add(customer);
    }

    public Account findAccount (int accountId) {
        for (Customer c : customers) {
            for (Account acc : c.getAccounts()) {
                if (acc.getAccountId() == accountId) {
                    return acc;
                }
            }
        }
        return null;
    }
}

class Customer {
    private int customerId;
    private String name;
    private String email;
    private List<Account> accounts = new ArrayList<>();

    public Customer(int customerId, String name, String email) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

    public void createAccount(String type, int accountId) {
        if (type.equalsIgnoreCase("checking")) {
            Account account = new CheckingAccount(accountId, 0);
            accounts.add(account);
        }
        else if (type.equalsIgnoreCase("savings")) {
            Account account = new SavingsAccount(accountId, 0);
            accounts.add(account);
        }
    }

    @Override
    public String toString() {
        return customerId + " - " + name + ", " + email;
    }
}

abstract class Account implements Transaction {
    private int accountId;
    private float balance;

    public Account(int accountId, float balance) {
        this.accountId = accountId;
        this.balance = balance;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public float getBalance() {
        return balance;
    }

    public void setBalance(float balance) {
        this.balance = balance;
    }
}

class CheckingAccount extends Account {
    private final float overdraftLimit = 100;

    public CheckingAccount(int accountId, float balance) {
        super(accountId, balance);
    }

    //  withdraw with overdraft
    public boolean withdraw(float amount) {
        float newBalance = getBalance() - amount;
        if (newBalance < (overdraftLimit * -1)) {
            return false;
        }
        setBalance(newBalance);
        return true;
    }

    public boolean deposit(float amount) {
        setBalance(getBalance() + amount);
        return true;
    }

    @Override
    public String toString() {
        return getAccountId() + " - " + " Checking Account: $" + getBalance();
    }
}

class SavingsAccount extends Account {
    public SavingsAccount(int accountId, float balance) {
        super(accountId, balance);
    }

    //  no overdraft for withdraw
    public boolean withdraw(float amount) {
        float newBalance = getBalance() - amount;

        if (newBalance < 0) {
            return false;
        }
        setBalance(newBalance);
        return true;
    }

    public boolean deposit(float amount) {
        setBalance(getBalance() + amount);
        return true;
    }

    @Override
    public String toString() {
        return getAccountId() + " - " + " Savings Account: $" + getBalance();
    }
}

interface Transaction {
    boolean withdraw(float amount);
    boolean deposit(float amount);
}