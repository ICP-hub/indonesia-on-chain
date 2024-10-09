import * as yup from 'yup';

const offensiveWordsRegex = new RegExp([
  "^[a@][s\$][s\$]$",
  "[a@][s\$][s\$]h[o0][l1][e3][s\$]?",
  "b[a@][s\$][t\+][a@]rd",
  "b[e3][a@][s\$][t\+][i1][a@]?[l1]([i1][t\+]y)?",
  "b[e3][a@][s\$][t\+][i1][l1][i1][t\+]y",
  "b[e3][s\$][t\+][i1][a@][l1]([i1][t\+]y)?",
  "b[i1][t\+]ch[s\$]?",
  "b[i1][t\+]ch[e3]r[s\$]?",
  "b[i1][t\+]ch[i1]ng?",
  "b[l1][o0]wj[o0]b[s\$]?",
  "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u",
  "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]d",
  "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]r",
  "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[i1]ng",
  "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[s\$]",
  "^cum[s\$]?$",
  "cumm??[e3]r",
  "cumm?[i1]ngcock",
  "(c|k|ck|q)um[s\$]h[o0][t\+]",
  "(c|k|ck|q)un[i1][l1][i1]ngu[s\$]",
  "(c|k|ck|q)un[i1][l1][l1][i1]ngu[s\$]",
  "(c|k|ck|q)unn[i1][l1][i1]ngu[s\$]",
  "(c|k|ck|q)un[t\+][s\$]?",
  "(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)",
  "(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[e3]r",
  "(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[i1]ng",
  "cyb[e3]r(ph|f)u(c|k|ck|q)",
  "d[a@]mn",
  "d[i1]ck",
  "d[i1][l1]d[o0]",
  "d[i1][l1]d[o0][s\$]",
  "d[i1]n(c|k|ck|q)",
  "d[i1]n(c|k|ck|q)[s\$]",
  "[e3]j[a@]cu[l1]",
  "(ph|f)[a@]g[s\$]?",
  "(ph|f)[a@]gg[i1]ng",
  "(ph|f)[a@]gg?[o0][t\+][s\$]?",
  "(ph|f)[a@]gg[s\$]",
  "(ph|f)[e3][l1][l1]?[a@][t\+][i1][o0]",
  "(ph|f)u(c|k|ck|q)",
  "(ph|f)u(c|k|ck|q)[s\$]?",
  "g[a@]ngb[a@]ng[s\$]?",
  "g[a@]ngb[a@]ng[e3]d",
  "j[a@](c|k|ck|q)\-?[o0](ph|f)(ph|f)?",
  "j[e3]rk\-?[o0](ph|f)(ph|f)?",
  "j[i1][s\$z][s\$z]?m?",
  "[ck][o0]ndum[s\$]?",
  "mast(e|ur)b(8|ait|ate)",
  "n+[i1]+[gq]+[e3]*r+[s\$]*",
  "[o0]rg[a@][s\$][i1]m[s\$]?",
  "[o0]rg[a@][s\$]m[s\$]?",
  "p[e3]nn?[i1][s\$]",
  "p[i1][s\$][s\$]",
  "p[i1][s\$][s\$][o0](ph|f)(ph|f)",
  "p[o0]rn",
  "p[o0]rn[o0][s\$]?",
  "p[o0]rn[o0]gr[a@]phy",
  "pr[i1]ck[s\$]?",
  "pu[s\$][s\$][i1][e3][s\$]",
  "pu[s\$][s\$]y[s\$]?",
  "[s\$][e3]x",
  "[s\$]h[i1][t\+][s\$]?",
  "[s\$][l1]u[t\+][s\$]?",
  "[s\$]mu[t\+][s\$]?",
  "[s\$]punk[s\$]?",
  "[t\+]w[a@][t\+][s\$]?",
  "\b[mM][iI][lL][fF]\b",
].join('|', 'i'));

const integerValidation = (value) => {
  if (Number.isInteger(value) && value >= 0) {
    return true;
  }
  return false;
};


const isNameValid = (value) => {
  const trimmedName = value.trim();
  return /^[^\s].*[^\s]$/.test(trimmedName);
};

const isUsernameValid = (value) => {
  const trimmedUsername = value.trim();
  return trimmedUsername.length > 0 && /^[^\s]+$/.test(trimmedUsername);
};


const imageCheck = (value) => {

  if (!value) {
    return false;
  }

  return true;
}



const commonSchema = yup.object({
  name: yup
    .string()
    .required("Nama wajib diisi")
    .matches(/^[a-zA-Z\s]*$/, "Nama hanya boleh berisi huruf dan spasi")
    .test("nama yang valid", "Salah nama", isNameValid),
  username: yup
    .string()
    .required("Nama belakang diperlukan")
    .matches(/^[a-zA-Z0-9]*$/, "Nama pengguna hanya boleh berisi huruf dan angka")
    .test("nama pengguna yang valid", "Nama pengguna tidak valid", isUsernameValid),
  email: yup
    .string()
    .required("Email diperlukan")
    .email("alamat email tidak sesuai dengan format"),
  bio: yup
    .string()
    .max(250, "Bio tidak boleh lebih dari 250 karakter")
    .test(
      "tidak boleh ada kata-kata yang menyinggung",
      "Bio Anda mengandung konten yang tidak pantas",
      (value) => !offensiveWordsRegex.test(value)
    ),
  nationalIdType: yup.string().required("Jenis ID Nasional wajib diisi"),
  nationalId: yup
    .string()
    .required("ID diperlukan")
    .max(16, "Tanda pengenal nasional tidak boleh lebih dari 16 karakter")
    .matches(
      /^[0-9a-zA-Z]+$/,
      "Tanda pengenal nasional hanya boleh berisi karakter alfanumerik"
    )
});

export const educatorSchema = commonSchema.concat(
  yup.object({
    experience: yup
      .number()
      .required()
      .test(
        'bilangan bulat',
        'Silakan masukkan periode pengalaman yang valid dalam jumlah tahun',
        integerValidation
      )
      .typeError('Silakan masukkan periode pengalaman yang valid dalam jumlah tahun'),
  })
);

export const studentSchema = commonSchema.concat(
  yup.object({
    // Add specific fields for the student form if needed
  })
);
