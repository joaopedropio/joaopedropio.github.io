User Api
=====================

What is the User Api?
---------------------

The User Api is responsible for CRUD operations on the users information.

The current schema is:

    - name: (String, required) - Complete name of the user
    - address: (String) - Complete address of the user
    - phone: (String) - User's phone number
    - email: (String) - Complete email address
    - username: (String, required, index) - User's username
    - password: (String, required) - The User's hashed password
    - salt: (String, required) - The salt used with the password

The User Authentication Api wil be responsible to get a random value for the salt field.

What is a hashed password?
--------------------------

Imagine the database is compromised. If the passwords are store as plain text, the atacker will have access to the users passwords. This can be used to exploit other users sites and we don't want this to happen. So we hash the password.

Hashing is the process of taking a string and run a set of algorithms on it. The output of this process will be a large string of characters very different from the original one. For example:

| password | hashed password                          |
|:--------:|:----------------------------------------:|
| 1234     | 7110eda4d09e062aa5e4a390b0a572ac0d2c0220 |
| 12345    | 8cb2237d0679ca88db6464eac60da96345513964 |
| joao     | c510cd8607f92e1e09fd0b0d0d035c16d2428fa4 |
| jobo     | 2eec13915d4ab750b7e496e2299ead0e1b8fb38e |

This is good because, if the attacker sees the database, he will not have the user's password.
It seems like heaven, doesn't it? Well, it isn't...

And the salt field?
-------------------

The majority of the users use weak passwords: few characters, only letters, easy to guess passwords.
If the attacker sees the pattern, he/she will guess the password based on this fact.
A good aproach to this problem is to mix a random string with the plain text password and hash it instead, like this: "userpassword" + "salt".

Fun fact: the name of this field is called salt because of the analogy of a meat grinder. After the grinding process, the result will be the same for each steak you put in. With salt, the result is different.

The above table would look like this:

| password | salt       | hashed password                          |
|:--------:|:----------:|:----------------------------------------:|
| 1234     | 4d09e062aa | a67e8ce848addf58977079a622a32debf1231b2a |
| 1234     | 60da963455 | e38e62e98fea6b4dac919d2496b2ce906442701b |
| 1234     | d0b0d0d035 | 8cec4569ace795b858272b7a3f01362394bcd238 |
| 1234     | 299ead0e1f | b12cb432a5885f778c15516a64b3bc8ae54c73f1 |

You see? The same password, completly different hashes!

###### The hash algorithm used in the examples above is the Sha-1, wich is very weak to use today

[Here](https://crackstation.net/hashing-security.htm) is a great article that goes deep into the subject.